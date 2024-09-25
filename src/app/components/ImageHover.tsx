"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
const ImageHover = ({ PathFile, likes, comments }: { PathFile: string, likes: any[], comments: any[] }) => {
    const [hoverComponent, setHoverComponent] = useState<boolean>(false);

   const [widthSize,setWidthSize]=useState<number>(window.innerWidth);

   
   useEffect(() => {
     // Handler to call on window resize
     const handleResize = () => {
         setWidthSize(
         window.innerWidth,);
     };
 
     // Add event listener for window resize
     window.addEventListener("resize", handleResize);
 
     // Clean up the event listener on component unmount
     return () => window.removeEventListener("resize", handleResize);
   }, []); // Empty array ensures this effect runs once on mount
 
   console.log({widthSize})
    const handleMouseEnter = () => {
        setHoverComponent(true);
    };

    const handleMouseLeave = () => {
        setHoverComponent(false);
    };
    const [isLoaded,setIsLoaded]=useState<boolean>(false);




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
            <Image 
             onLoad={()=>{setIsLoaded(true)}}
            src={`${PathFile}`} priority  fill
        loading='eager'  className={`rounded-sm object-cover cursor-pointer 
            ${isLoaded ? 'blur-0 opacity-100' : 'blur-lg opacity-100'}
        ${hoverComponent && "opacity-35"} `} alt=""  />
        </div>
    )
}

export default ImageHover