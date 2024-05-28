"use client"
import Image from 'next/image'
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import StoryPost from './StoryPost';
import Storywait from './Storywait';



interface StoryType {
    img: string
}
const ToggleStory = ({ toggleStory, setToggleStory, storyIndex, stories, setStoryIndex }: { toggleStory: boolean, setToggleStory: Dispatch<SetStateAction<boolean>>, storyIndex: number, setStoryIndex: Dispatch<SetStateAction<number>>, stories: StoryType[] }) => {



    const handleModalClose = () => {
        setToggleStory(false);
    };


    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);




    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            // Click occurred outside the modal content, so close the modal
            handleModalClose();
        }
    };


    useEffect(() => {
        // Attach event listener when modal opens
        if (toggleStory) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        // Remove event listener when modal closes
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggleStory]);


    return (
        <div className='w-screen h-screen py-2 z-[99999999] fixed top-0 bottom-0 left-0 right-0 bg-[#0f0202] '>
            <div className="w-full py-2 hidden sm:flex items-center justify-between ">
                <Link href="/" >
                    <Image src="/instagram-logo-white.png" alt="" width={120} height={60} />
                </Link>
                <div onClick={() => handleModalClose()} className="w-8 h-8 z-[9999999] rounded-full cursor-pointer justify-center flex items-center bg-white">
                    <IoIosClose size={30} />
                </div>
            </div>

            <div
                style={{ transitionDuration: "1300ms" }}
                className="w-full h-full transition-all  ease-in-out  fixed top-0 left-0 flex gap-1 sm:px-4 sm:gap-4 py-5 items-center justify-center">

                {
                    stories.map((story: StoryType, index: number) => {
                        const isCurrentStory = index === storyIndex;
                        const isWithinOneStory = index < storyIndex + 2 && index > storyIndex - 2;
                        const isWithinThreeStories = index < storyIndex + 3 && index > storyIndex - 3;

                        return (
                            <>
                                {isCurrentStory ? (
                                    <StoryPost
                                        setToggleStory={setToggleStory}
                                        story={story}
                                        lengthStories={stories.length}
                                        setStoryIndex={setStoryIndex}
                                        indexStory={index}
                                    />
                                ) : (
                                    width < 800 && isWithinOneStory ? (
                                        <Storywait
                                            story={story}
                                            storyIndex={index}
                                            lengthStories={stories.length}
                                            setStoryIndex={setStoryIndex}
                                        />
                                    ) :
                                        (width > 800 && isWithinThreeStories ?
                                            <Storywait
                                                story={story}
                                                storyIndex={index}
                                                lengthStories={stories.length}
                                                setStoryIndex={setStoryIndex}
                                            />
                                            :
                                            ""
                                        )
                                )}
                            </>
                        );
                    })
                }









            </div>
        </div>
    )
}

export default ToggleStory