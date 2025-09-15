"use client";

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEdgeStore } from '@/lib/edgestore'

import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import { Settings2Icon, Trash2Icon, XIcon, Loader2Icon } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { CourseTypes, InstitutionTypes, SubjectTypes, UnitTypes } from '@/store/types'
import { useDeleteCourseMutation, useDeleteInstitutionMutation, useDeleteSubjectMutation, useDeleteUnitMutation } from '@/store'

type Props = {
    title: string,
    deleteName: string,
    userId: string,
    isAuthorized: boolean,
    documentData: InstitutionTypes | CourseTypes | SubjectTypes | UnitTypes
}

type Params = {
    instituteID: string,
    courseID: string,
    subjectID: string,
    unitID: string
}

type RecentDataType = {
    [key: string]: {
        url: string,
        title: string,
        subtitle: string
    }[]
}

const DropdownSettings = ({ title, deleteName, userId, isAuthorized, documentData }: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const params = useParams<Params>()
    const router = useRouter()
    const { edgestore } = useEdgeStore();

    // Delete Mutation Handler
    const [deleteInstitution] = useDeleteInstitutionMutation();
    const [deleteCourse] = useDeleteCourseMutation();
    const [deleteSubject] = useDeleteSubjectMutation();
    const [deleteUnit] = useDeleteUnitMutation();

    // Compare input value with the text to delete
    const compareText = (value: string) => {
        if (value === `Delete ${deleteName}`)
            setIsDisabled(false)
        else
            setIsDisabled(true)
    }

    // Delete LocalStorage Recents data
    const deleteRecentTopics = async () => {
        const recentDataUsers: RecentDataType = JSON.parse(localStorage.getItem("academia-recents") as string) || []
        const recentData = recentDataUsers[userId]

        const filteredData = recentData?.filter((obj) => {
            const topic = obj.url.split("/"); //split url to compare each text with toDeleteName
            return !topic.includes(deleteName?.replaceAll(" ", "-").toLowerCase());
        }); // return only the topics which dont include the toDeleteName value

        recentDataUsers[userId] = filteredData
        localStorage.setItem("academia-recents", JSON.stringify(recentDataUsers))
    }

    // Delete all uploaded documents from EdgeStore
    const deleteAllDocuments = async (type: "institute" | "course" | "subject" | "unit") => {
        if (type === "institute") {
            const Institute = documentData as InstitutionTypes;
            Institute?.courses?.forEach((course) => {
                course?.subjects?.forEach((subject) => {
                    subject?.units?.forEach(async (unit) => {
                        unit?.documents?.forEach(async (document) => {
                            await edgestore.publicFiles.delete({
                                url: document.link,
                            });
                        })
                    })
                })
            })
        } else if (type === "course") {
            const Course = documentData as CourseTypes;
            Course?.subjects?.forEach((subject) => {
                subject?.units?.forEach(async (unit) => {
                    unit?.documents?.forEach(async (document) => {
                        await edgestore.publicFiles.delete({
                            url: document.link,
                        });
                    })
                })
            })
        } else if (type === "subject") {
            const Subject = documentData as SubjectTypes;
            Subject?.units?.forEach(async (unit) => {
                unit?.documents?.forEach(async (document) => {
                    await edgestore.publicFiles.delete({
                        url: document.link,
                    });
                })
            })
        } else if (type === "unit") {
            const Unit = documentData as UnitTypes;
            Unit?.documents?.forEach(async (document) => {
                await edgestore.publicFiles.delete({
                    url: document.link,
                });
            })
        }
    }

    const handleDelete = async () => {
        setIsLoading(true)
        setIsDisabled(true)
        try {
            if (title === "Institute") {
                const res = await deleteInstitution(documentData.id).unwrap();

                if (res?.status === 200) {
                    await deleteRecentTopics()
                    await deleteAllDocuments("institute")
                    toast.success(`${title} deleted successfully!`)
                    setOpen(false)
                    router.push(`/institutions`)
                }
            } else if (title === "Course") {
                const res = await deleteCourse(documentData.id).unwrap();

                if (res?.status === 200) {
                    await deleteRecentTopics()
                    await deleteAllDocuments("course")
                    toast.success(`${title} deleted successfully!`)
                    setOpen(false)
                    router.push(`/institutions/${params?.instituteID}`)
                }
            } else if (title === "Subject") {
                const res = await deleteSubject(documentData.id).unwrap();

                if (res?.status === 200) {
                    await deleteRecentTopics()
                    await deleteAllDocuments("subject")
                    toast.success(`${title} deleted successfully!`)
                    setOpen(false)
                    router.push(`/institutions/${params?.instituteID}/${params?.courseID}`)
                }
            }
            else if (title === "Unit") {
                const res = await deleteUnit(documentData.id).unwrap();

                if (res?.status === 200) {
                    await deleteRecentTopics()
                    await deleteAllDocuments("unit")
                    toast.success(`${title} deleted successfully!`)
                    setOpen(false)
                    router.push(`/institutions/${params?.instituteID}/${params?.courseID}/${params?.subjectID}`)
                }
            }
        } catch (err) {
            console.log(err)
            toast.error(`Error while deleting ${title}`)
        } finally {
            setIsLoading(false)
            setIsDisabled(false)
        }
    }

    return (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <Dialog open={open} onOpenChange={setOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger className='bg-background/80 p-2 rounded-md cursor-pointer'>
                        <Settings2Icon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mr-7 border border-primary/50 bg-background/80 backdrop-blur'>
                        <DropdownMenuLabel>Manage {title}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem className='flex_center gap-2 cursor-pointer'>
                            <User2 size={18} />
                            <span>Creator Profile</span>
                        </DropdownMenuItem> */}
                        {(isAuthorized) &&
                            <DropdownMenuItem>
                                <DialogTrigger className='flex_center gap-2 !text-red-600 cursor-pointer'>
                                    <Trash2Icon size={18} className='text-red-600' />
                                    <span>Delete {title}</span>
                                </DialogTrigger>
                            </DropdownMenuItem>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent className='w-[90%] md:max-w-fit mx-auto rounded-md'>
                    <DialogHeader>
                        <DialogTitle>Delete {title} <span className='text-red-600'>{deleteName}</span> ?</DialogTitle>
                        <DialogDescription>
                            Are you sure about that? <br />
                            This will permanently delete the {title} and all of its contents.
                        </DialogDescription>
                    </DialogHeader>

                    <label className="relative sm:min-w-[350px]">
                        <span className='text-[0.9em] bg-background/0 px-1'>
                            Type &quot; <span className='text-red-500'>Delete {deleteName}</span> &quot; to confirm.
                        </span>

                        <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1 mt-3">
                            <input
                                type="text"
                                placeholder={`Delete ${deleteName}`}
                                required={true}
                                onChange={(e) => compareText(e.target.value)}
                                className='text-[0.9em] w-full bg-background/0 px-2 py-1 border-none outline-none placeholder:text-secondary-foreground/70' />
                        </div>
                    </label>

                    <DialogFooter className="flex-row gap-4 mt-4">
                        <DialogClose asChild>
                            <Button variant="secondary" className='flex items-center gap-2 flex-1/2 cursor-pointer'>
                                <XIcon size={20} />
                                <span>Cancel</span>
                            </Button>
                        </DialogClose>

                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDisabled}
                            className='flex items-center gap-2 flex-1/2 text-white deleteBtnBg cursor-pointer'>
                            {isLoading ?
                                <>
                                    <Loader2Icon size={20} className='animate-spin' />
                                    <span>Deleting</span>
                                </>
                                :
                                <>
                                    <Trash2Icon size={20} />
                                    <span>Delete</span>
                                </>
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DropdownSettings