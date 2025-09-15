"use client";

import CountUp from "react-countup"
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { DashboardCount, useGetDashboardCountQuery } from "@/store";

import { AlertCircle, RefreshCw } from "lucide-react"
import MobileHeader from '@/components/MobileHeader'
import RecentTopics from "@/components/RecentTopics"
import BuildingSVG from '@/assets/Icons/BuildingSVG'
import BookStackSVG from '@/assets/Icons/BookStackSVG'
import OpenBookSVG from '@/assets/Icons/OpenBookSVG'
import DocumentsSVG from '@/assets/Icons/DocumentsSVG'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions, SEL_User } from "@/store";

const Dashboard = () => {
    const { data: session } = useSession();
    const [count, setCount] = useState<DashboardCount>();
    const dispatch = useDispatch();
    const { user } = useSelector(SEL_User);

    // Get dashboard count data
    const { data } = useGetDashboardCountQuery({});

    // Function to refresh user data
    const refreshUserData = async () => {
        try {
            console.log('Refreshing user data...');
            // Clear the cache to force a fresh fetch
            localStorage.removeItem('lastUserRefresh');
            
            const response = await fetch('/api/user/me');
            console.log('Response status:', response.status);
            
            if (response.ok) {
                const userData = await response.json();
                console.log('User data received:', userData);
                dispatch(userActions.setUser(userData));
                alert(`User data refreshed! Approval status: ${userData.isApproved ? 'APPROVED' : 'PENDING'}`);
            } else {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                alert(`Error: ${errorData.error || 'Failed to refresh user data'}`);
            }
        } catch (error) {
            console.error('Error refreshing user data:', error);
            alert('Error refreshing user data');
        }
    };

    useEffect(() => {
        if (data) {
            setCount(data)
        }
    }, [data])

    // Debug current user state
    useEffect(() => {
        console.log('Current user state:', user);
        console.log('User isApproved:', user.isApproved);
    }, [user])

    return (
        <section className='section_style'>
            <MobileHeader />

            <div className="flex justify-between items-center">
                <h1 className='text-[1.6em] text-center sm:text-[2em] font-medium'>
                    Welcome,
                    <span className="text-primary"> {user.name?.split(" ")[0] ?? "Student"}</span> !
                </h1>
                
                {!user.isApproved && (
                    <button
                        onClick={refreshUserData}
                        className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors text-sm"
                        title="Refresh approval status"
                    >
                        <RefreshCw size={16} />
                        Refresh Status
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8 sm:mx-8 2xl:mx-[10em] mt-4 2xl:mt-8">
                <div className="relative rounded-md flex flex-col items-end overflow-hidden p-2.5 radialGradient radialGradientDark">
                    <div className="flex justify-between items-start w-full">
                        <BuildingSVG size='50' className='text-white dark:text-white/80' />
                        <CountUp end={count?.institutes || 0} duration={4} className='text-[2.5em] font-bold text-white leading-[1.5em] mr-4 z-[1]' />
                    </div>
                    <p className='w-full text-center text-[0.9em] sm:text-[1.1em] text-white dark:text-white/80 z-[1]'>Institutes registered</p>
                </div>

                <div className="relative rounded-md flex flex-col items-end overflow-hidden p-2.5 radialGradient radialGradientDark">
                    <div className="flex justify-between items-start w-full">
                        <BookStackSVG size='50' className='text-white dark:text-white/80' />
                        <CountUp end={count?.courses || 0} duration={4} className='text-[2.5em] font-bold text-white leading-[1.5em] mr-4 z-[1]' />
                    </div>
                    <p className='w-full text-center text-[0.9em] sm:text-[1.1em] text-white dark:text-white/80 z-[1]'>Courses created</p>
                </div>

                <div className="relative rounded-md flex flex-col items-end overflow-hidden p-2.5 radialGradient radialGradientDark">
                    <div className="flex justify-between items-start w-full">
                        <OpenBookSVG size='50' className='text-white dark:text-white/80' />
                        <CountUp end={count?.subjects || 0} duration={4} className='text-[2.5em] font-bold text-white leading-[1.5em] mr-4 z-[1]' />
                    </div>
                    <p className='w-full text-center text-[0.9em] sm:text-[1.1em] text-white dark:text-white/80 z-[1]'>Subjects created</p>
                </div>

                <div className="relative rounded-md flex flex-col items-end overflow-hidden p-2.5 radialGradient radialGradientDark">
                    <div className="flex justify-between items-start w-full">
                        <DocumentsSVG size='50' className='text-white dark:text-white/80' />
                        <CountUp end={count?.documents || 0} duration={4} className='text-[2.5em] font-bold text-white leading-[1.5em] mr-4 z-[1]' />
                    </div>
                    <p className='w-full text-center text-[0.9em] sm:text-[1.1em] text-white dark:text-white/80 z-[1]'>Files uploaded</p>
                </div>
            </div>

            <Link
                href='./institutions'
                className="flex lg:hidden justify-start items-center gap-6 bg-primary/40 p-2 px-4 rounded-md text-white mt-6 max-w-lg mx-auto">
                <BuildingSVG size='30' />
                <span className='text-[1.25em]'>Institutions</span>
            </Link>

            {!user.isApproved &&
                <div className="alertGradient border border-yellow-400/40 w-fit mx-auto my-2 mt-8 px-4 py-2 text-center rounded-md">
                    <div className="flex_center gap-2 mb-2">
                        <AlertCircle size={20} />
                        User Approval Pending!
                    </div>
                    <p className="text-[0.9em]">You will gain CREATE / UPLOAD Access after approval by admin.</p>
                    <p className="text-[0.9em]">An email will be sent to <span className="text-blue-600">{user.email}</span> after approval</p>
                </div>
            }

            <RecentTopics />
        </section>
    )
}

export default Dashboard
