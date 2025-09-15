"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Button } from './ui/button'
import { RectLoader } from "./CustomUI/Skeletons"
import AvatarImage from './CustomUI/AvatarImage'
import { LogOutIcon } from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'
import { modalActions, SEL_User, userActions } from '@/store'
import { loaderActions } from '@/store/loaderSlice/loaderSlice'
import { UserTypes } from '@/store/types'

const UserAvatar = () => {
    const { user } = useSelector(SEL_User);
    const { data: session, status } = useSession()
    const router = useRouter()
    const dispatch = useDispatch()

    // Function to refresh user data
    const refreshUserData = async () => {
        try {
            const response = await fetch('/api/user/me');
            if (response.ok) {
                const userData = await response.json();
                dispatch(userActions.setUser(userData));
            }
        } catch (error) {
            console.error('Error refreshing user data:', error);
        }
    };

    useEffect(() => {
        // console.log(session, status)
        const isAnonymousUser = JSON.parse(localStorage.getItem('academia-anonymous-user') as string)

        if (isAnonymousUser) {
            // Set a dummy Anonymous user info
            const formattedUser = {
                id: "anonymous",
                name: "Student",
                email: "Anomymous User",
                image: "",
                emailVerified: false,
                isApproved: false,
                createdAt: null,
                updatedAt: null,
            }

            dispatch(userActions.setUser(formattedUser))
            dispatch(userActions.setIsLoading(false))
            dispatch(loaderActions.setShowLoader(false));
        } else if (status == "authenticated" && session.user) {
            // Set user data from session but don't set isApproved from session
            // We'll get the latest isApproved from the database
            const formattedUser = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
                emailVerified: session.user.emailVerified,
                isApproved: false, // Always start with false, will be updated by refresh
                createdAt: session.user.createdAt,
                updatedAt: session.user.updatedAt,
            } as UserTypes

            dispatch(userActions.setUser(formattedUser))
            dispatch(userActions.setIsLoading(false))
            dispatch(loaderActions.setShowLoader(false));
        } else if (status === "unauthenticated") {
            router.push('/')
        }
    }, [session, status, router, dispatch])

    // Separate effect to refresh user data when authenticated
    useEffect(() => {
        if (status === "authenticated" && session?.user?.id) {
            // Always refresh user data to get latest approval status
            refreshUserData();
        }
    }, [status, session?.user?.id])

    return (
        <div className="flex justify-between items-center gap-2 w-full rounded text-white">
            <AvatarImage url={user.image} />

            <div className="flex_center flex-col w-full max-w-[9.5em]">
                {status == "loading" ?
                    <>
                        <RectLoader height='22px' className='mb-1' />
                        <RectLoader height='14px' />
                    </>
                    :
                    <>
                        <h2 className="text-[0.95em]">{user.name}</h2>
                        <span className='opacity-80 text-[0.6em] tracking-wider'>{user.email}</span>
                    </>
                }
            </div>

            <Button
                size="icon"
                onClick={() => dispatch(modalActions.show("LogoutModal"))}
                className='deleteBtnBg cursor-pointer'
                name='Logout'
                title='Logout'
                disabled={status == "loading"}>
                <LogOutIcon color='white' className='size-5' />
            </Button>
        </div>
    )
}


export default UserAvatar