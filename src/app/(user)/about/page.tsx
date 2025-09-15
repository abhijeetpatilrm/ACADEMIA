import React from 'react'
import Logo from '@/assets/Icons/Logo'
import { DiscordIcon, FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@/assets/SVGs';
import Image from 'next/image';
import MobileHeader from '@/components/MobileHeader';

const About = () => {
    return (
        <section className='flex flex-col justify-between gap-4 px-4 py-3 w-full h-full min-h-screen'>
            <MobileHeader />

            <h1 className='text-[1.5em] md:text-[2em] font-medium'>About <span className="text-primary font-bold">ACADEMIA</span></h1>

            <section className='md:max-w-[80%] mx-auto'>
                <div className="relative flex_center w-full max-w-[240px] h-[240px] mx-auto my-10">
                    <span className='absolute w-full aspect-square rounded-full bg-primary/80 opacity-0 animate-ripple'></span>
                    <span className='absolute w-full aspect-square rounded-full bg-primary/80 opacity-0 animate-ripple delay-700'></span>
                    <Logo stroke='hsl(222.2 84% 4.9%)' size='120' className='z-[1]' />
                </div>

                <p className='hidden md:block text-justify indent-16 px-8 text-xl'>ACADEMIA (Academic Resource Management System) is an all-inclusive educational platform designed to empower students with easy access to study materials for their respective subjects. By logging in anonymously, students can conveniently browse and download PDF documents uploaded by authorized faculties. With a centralized approach, ACADEMIA ensures that students can effortlessly find and obtain the necessary resources they need for their academic pursuits. It&apos;s a user-friendly solution that streamlines the process of resource management, providing a seamless experience for both students and faculties alike.</p>

                <p className='md:hidden text-justify indent-14 px-8'>ACADEMIA (Academic Resource Management System) is a platform that enables students to access study materials uploaded by faculty members. Students can anonymously log in to browse and download PDF documents. ACADEMIA simplifies resource management for both students and faculty, ensuring easy access to academic materials.</p>
            </section>

            <footer
                className="relative bottom-0 w-full flex justify-between items-center flex-col gap-8 px-4 py-6"
            >
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-20 gap-y-8 lg:gap-20">
                    <a
                        href="https://www.facebook.com/abhijeetpatilrm/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image src={FacebookIcon} alt="FaceBook" width={25} height={25} />
                    </a>
                    <a href="https://x.com/abhijeetpatilrm" target="_blank" rel="noreferrer">
                        <Image src={TwitterIcon} alt="Twitter X" width={25} height={25} />
                    </a>
                    <a
                        href="https://www.instagram.com/abhijeetpatilrm/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image src={InstagramIcon} alt="Instagram" width={25} height={25} />
                    </a>
                    <a
                        href="https://in.linkedin.com/in/abhijeetpatilrm"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image src={LinkedinIcon} alt="Discord" width={25} height={25} />
                    </a>
                    <a
                        href="https://github.com/abhijeetpatilrm"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image src={GithubIcon} alt="Discord" width={25} height={25} />
                    </a>
                    <a
                        href="https://discord.com/invite/8ngPa6tE"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image src={DiscordIcon} alt="Discord" width={25} height={25} />
                    </a>
                </div>

                <span className='text-[0.9em]'>© Copyright {new Date().getFullYear()} Abhijeet Patil</span>
            </footer>
        </section>
    )
}

export default About