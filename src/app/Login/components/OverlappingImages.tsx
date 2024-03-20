"use client"
import React, { useState, useEffect } from 'react';

import Image from 'next/image';


type Ipropos={
  images:string[],
  transitionDuration:number,
   delay  :number,
} 





const OverlappingImages = ({ images, transitionDuration, delay}:Ipropos) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, transitionDuration + delay);

    return () => clearInterval(intervalId);
  }, [images, transitionDuration, delay]);


  console.log({currentImageIndex:currentImageIndex})




  return (
    <>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={`image ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}  absolute right-12 py-4 `}
          width={220} 
          height={185}
          style={{
            transition: `opacity ${transitionDuration / 1000}s ease`,
            transitionDelay: `${index * delay / 1000}s`
          }}
        />
      ))}
    </>
  );
};

export default OverlappingImages;
