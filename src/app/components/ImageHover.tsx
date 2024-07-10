"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
const ImageHover = ({ PathFile, likes, comments }: { PathFile: string, likes: any[], comments: any[] }) => {
    const [hoverComponent, setHoverComponent] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setHoverComponent(true);
    };

    const handleMouseLeave = () => {
        setHoverComponent(false);
    };
    return (
        <div
            className='w-full h-full relative hover:bg-black'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {hoverComponent &&
            <div className='w-full h-full bg-[#0000005b] z-[50] flex items-center justify-center gap-3'>
                <div className="flex items-center justify-center flex-col gap-2">
                    <FaHeart size={50} color='white'/>
                    <p className='text-xl text-white'>{likes.length}</p>
                </div>    
                <div className="flex items-center justify-center flex-col gap-2">
                    <FaRegComment size={50} color='white'/>
                    <p className='text-xl text-white'>{comments.length}</p>
                </div>    
            </div>}
            <Image src={`${PathFile}`} priority  fill
        loading='eager'  className={`rounded-sm object-cover cursor-pointer ${hoverComponent && "opacity-35"} `} alt=""  />
        </div>
    )
}

export default ImageHover