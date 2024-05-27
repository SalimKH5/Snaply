
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getImageSize, useImageSize } from 'react-image-size';





interface StoryType {
    img: string
}





const Storywait = ({ setStoryIndex, lengthStories, storyIndex, story }: { setStoryIndex: Dispatch<SetStateAction<number>>, lengthStories: number, storyIndex: number, story: StoryType }) => {


    const [height,setHeight]=useState<number>(0);
    const [width,setWidth]=useState<number>(0);
    
  

    useEffect(()=>{
        async function fetchImageSize() {
            try {
                const dimensions = await getImageSize(story.img);
               
                setHeight(dimensions?.height);
                setWidth(dimensions?.width);
            } catch (error) {
                console.error(error);
            }
        }
        fetchImageSize()
       
    },[])


    return (
        <div
            onClick={() => {
                if(storyIndex<lengthStories){
                    setStoryIndex(storyIndex);
                }
               
            }}
            className="w-24 lg:w-40 cursor-pointer sm:h-[38vh] hidden sm:flex items-center justify-center">
            <div className="w-full h-[50vh]  relative bg-[#d2d2d611]">
                <div className="w-full absolute top-0 bottom-0 h-full z-[999] flex flex-col items-center justify-center">
                    <div className="w-12 h-12 relative flex items-center rounded-full justify-center ">
                        <Image src="/picture.jpg" alt="" fill className='object-cover rounded-full border-2 border-[#C13584] ' />
                    </div>
                    <p className='text-white text-xs lg:text-base font-extrabold'>SalimKhadir</p>
                </div>

                <div className="w-full absolute rounded-xl top-0 bottom-0 bg-slate-400 opacity-40  h-full z-[99] flex items-center justify-center">

                </div>

                <div className="w-full h-full z-[10]  relative ">
                <Image src={story.img} alt="" fill className={` object-center 
                    ${height>600 && width<=height? "object-cover" : "object-contain"}`} />
                </div>
            </div>
        </div>
    )
}

export default Storywait