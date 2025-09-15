"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import OpenBookSVG from '@/assets/Icons/OpenBookSVG'
import { useSelector } from 'react-redux'
import { SEL_User } from '@/store'

type RecentTopicsType = {
    [key: string]: RecentDataType[]
}

type RecentDataType = {
    url: string,
    title: string,
    subtitle: string
}

const RecentTopics = () => {
    const [recentTopic, setRecentTopic] = useState<RecentDataType[]>([])
    const { user } = useSelector(SEL_User);

    useEffect(() => {
        const userID = user.id as string
        const recentDataUsers: RecentTopicsType = JSON.parse(localStorage.getItem("academia-recents") as string) || []
        const userRecents = recentDataUsers[userID]
        setRecentTopic(userRecents)
    }, [user])

    if (recentTopic)
        return (
            <div>
                <h2 className='text-[1.3em] sm:text-[1.6em] font-medium mt-6 mb-2'>
                    Recent
                    <span className="text-primary"> Topics</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {recentTopic?.map((data, index) => (
                        <Link href={data?.url} key={index} className="radialGradient radialGradientDark p-2 px-4 flex justify-start items-center gap-6 rounded-md text-white">
                            <OpenBookSVG size='50' />
                            <div className="flex flex-col">
                                <span className="text-[0.8em] capitalize">{data?.subtitle}</span>
                                <h3 className="text-[1.2em] font-bold uppercase">{data?.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
}

export default RecentTopics