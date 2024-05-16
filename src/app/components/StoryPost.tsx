"use client"

import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { getImageSize, useImageSize } from 'react-image-size'



interface StoryType {
    img: string
}






const StoryPost = ({ setStoryIndex, lengthStories, indexStory, story }: { setStoryIndex: Dispatch<SetStateAction<number>>, lengthStories: number, indexStory: number ,story:StoryType}) => {




  
    const [progress, setProgress] = useState(0);
    const [height,setHeight]=useState<number>(0);
    const [width,setWidth]=useState<number>(0);
    
  

    useEffect(()=>{
        async function fetchImageSize() {
            try {
                const dimensions = await getImageSize(story.img);
                console.log(dimensions)
                setHeight(dimensions?.height);
                setWidth(dimensions?.width);
            } catch (error) {
                console.error(error);
            }
        }
        fetchImageSize()
       
    },[])



    useEffect(() => {
        const interval = setInterval(() => {
            // Simulating progress increment
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 500); // Adjust the interval as needed
        return () => {
            clearInterval(interval);
        };
    }, []);
    
    
    return (
        <div className='w-full sm:w-min flex items-center h-full'>
            <div className={`h-full w-8 hidden  ${indexStory === 0 ? "sm:hidden" : "sm:flex"} items-center justify-center`}>
                <div
                    onClick={() => {
                        setStoryIndex((prev: number) => {
                            if (prev > 0) {
                                return prev - 1;
                            }
                            return prev; // Return prev without modification if prev is already 0
                        });
                    }}

                    className="w-4 h-4 lg:w-6 lg:h-6 p-1 rounded-full cursor-pointer bg-white flex items-center justify-center">
                    <IoIosArrowBack />
                </div>

            </div>
            <div className="w-full sm:w-52 lg:w-72  h-screen sm:h-screen py-1 sm:rounded-lg  relative bg-[#d2d2d611] ">
                <div className="w-full absolute top-1 z-50 h-5 sm:h-16 py-2 flex flex-col gap-3  items-center ">
                    <div className="w-full flex items-center gap-[1px]">
                        <div className="w-full   bg-gray-400 h-[2px]">
                            <div className="bg-white h-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="w-full   bg-gray-400 h-[2px]">
                            <div className="bg-white h-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-between">
                        <div className="w-full  flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full relative ">
                                <Image src="/picture.jpg" alt="" fill className='object-cover rounded-full  ' />
                            </div>
                            <p className='text-white '>SalimKhadir</p>
                        </div>
                    </div>


                </div>

                <div className="w-full h-full z-[10]  relative">
                    <Image src={story.img} alt="" fill className={` object-center 
                         ${height>600 && width<=height? "object-cover" : "object-contain"}`} />
                </div>
            </div>
            <div className={`h-full w-8 hidden  ${indexStory === lengthStories - 1 ? "sm:hidden" : "sm:flex"} items-center justify-center`}>
                <div
                    onClick={() => {
                        setStoryIndex((prev: number) => {
                            if (prev < lengthStories - 1) {
                                return prev + 1;
                            }
                            return prev; // Return prev without modification if prev is already 0
                        });
                    }}
                    className="w-4 h-4 lg:w-6 lg:h-6 p-1 rounded-full cursor-pointer bg-white flex items-center justify-center">
                    <IoIosArrowForward />
                </div>

            </div>
        </div>

    )
}

export default StoryPost