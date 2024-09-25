"use client"
import Image from 'next/image'
import api from "../ApiConfig"
import { useEffect, useState } from 'react';
import { getImageSize, useImageSize } from 'react-image-size';

const PostPicture = ({ src }: { src: string }) => {


  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [isLoaded,setIsLoaded]=useState<boolean>(false);


  useEffect(() => {
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

  }, [])



  return (
    <div className="w-full h-full min-h-[30rem] relative " >
      <Image
        src={src}
        quality={50}
        alt={src}
        onLoad={()=>{setIsLoaded(true)}}
        fill
        loading='eager'
        className={`${width > 500 ? "object-cover" : "object-fill"}  w-full absolute left-0 right-0 h-full rounded-lg ${isLoaded ? 'blur-0 opacity-100' : 'blur-lg opacity-100'}`}
      />
    </div>
  )
}

export default PostPicture