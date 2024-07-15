"use client"
import React, { useCallback, useEffect, useState } from 'react'
import StoryContainer from './StoryContainer'
import { Spin } from 'antd'
import Post from './Post'
import Link from 'next/link'
import Image from 'next/image'
import { useToggleState } from './SearchToggle'

import dynamic from "next/dynamic";
const LazyComponent = dynamic(() => import("./StoryContainer"), {
    loading: () =>
      <div
        className={` w-full h-full flex items-center gap-2 sm:gap-3 py-6 px-1 `}>
                <div className="rounded-full  flex items-center justify-center w-16 h-16 bg-slate-300 animate-pulse "></div>
                <div className="rounded-full  flex items-center justify-center w-16 h-16 bg-slate-300 animate-pulse "></div>
                <div className="rounded-full  flex items-center justify-center w-16 h-16 bg-slate-300 animate-pulse "></div>
                <div className="rounded-full  flex items-center justify-center w-16 h-16 bg-slate-300 animate-pulse "></div>
                <div className="rounded-full  flex items-center justify-center w-16 h-16 bg-slate-300 animate-pulse "></div>
                <div className="rounded-full  flex items-center justify-center w-16 h-16 bg-slate-300 animate-pulse "></div>
                <div className="rounded-full  hidden lg:flex items-center justify-center w-16 h-16 bg-slate-300 animate-pulse "></div>
                <div className="rounded-full  hidden lg:flex items-center justify-center w-16 h-16 bg-slate-300 animate-pulse "></div>
                <div className="rounded-full hidden lg:flex items-center justify-center w-16 h-16 bg-slate-300 animate-pulse  "></div>
  
      </div>, // Optional loading component
    ssr: false, // Disable server-side rendering for this component
  });


const RightContainer = ({ posts, _id, loading, username, fullName }: { posts: Post[], _id: string, loading: boolean, username: string, fullName: string }) => {


    const { toggle, setToggle, searchToggle } = useToggleState();



    // Function to handle clicks outside of the component
    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (searchToggle.current && !searchToggle.current.contains(event.target as Node)) {
                setToggle(false); // Call onClose function when clicked outside
            }
        },
        [toggle]
    );

    // Add event listener when the component mounts
    useEffect(() => {
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);





    return (
        <>
            <div className="w-full md:ml-[13%]  lg:ml-[20%] flex-grow flex items-center max-w-[650px] lg:max-w-2xl mx-auto flex-col">
                <div className="w-full md:max-w-[46rem] flex justify-center items-center flex-col py-9 ">
                    {
                        loading ?
                            <Spin /> :
                            <>
                                <LazyComponent />
                                <div className="w-full  flex justify-center items-center">
                                    <div className="w-full h-full max-w-lg p-1 md:p-3 flex flex-col  justify-center gap-6">
                                    {

                                    posts?.map((post: Post, index: number) => (
                                        <Post
                                            userID={_id}
                                            key={index}
                                            post={post} />
                                        ))

                                    }
                                    </div>
                                </div>
                            </>}

                </div>

            </div>
            <div className=" h-full hidden min-[1200px]:flex lg:w-1/6 ">
                <div className="w-full items-start  flex py-8">
                    <Link href={`/${username}`} className="w-full  flex  gap-2">
                        <div className="w-16 h-12 relative  flex items-center justify-center">
                            <Image src="/profile.png" alt="" fill objectFit='cover' className='rounded-full border-[0.5px] border-[#000000] ' />
                        </div>
                        <div className="w-full flex flex-col">
                            <p>{username}</p>
                            <p>{fullName}</p>
                        </div>
                    </Link>


                </div>
            </div>
        </>
    )
}

export default RightContainer