"use client"
import Image from 'next/image'
import api from "../ApiConfig"
import { useEffect, useState } from 'react';
import { getImageSize, useImageSize } from 'react-image-size';

const PostPicture = ({src}:{src:string}) => {


  const [height,setHeight]=useState<number>(0);
    const [width,setWidth]=useState<number>(0);
    
  

    useEffect(()=>{
        async function fetchImageSize() {
            try {
                const dimensions = await getImageSize(src);
               
                setHeight(dimensions?.height);
                setWidth(dimensions?.width);
            } catch (error) {
                console.error(error);
            }
        }
        fetchImageSize()
       
    },[])



  return (
    <div className='w-full h-full min-h-[30rem] relative  '>
            <Image src={src} 
            alt={src} priority  fill 
            unoptimized
            className={`${width>500  ? "object-fill" : "object-contain"}  w-full absolute left-0 right-0 h-full rounded-lg`}/>
    </div>
  )
}

export default PostPicture