"use client"
import Story from './Story'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import "swiper/css/effect-coverflow"
import "swiper/css/autoplay"
import { useState } from 'react';
import ToggleStory from './ToggleStory';
import { useToggleState } from './SearchToggle';

interface StoryType{
  img:string
}



const StoryContainer = () => {
  const [toggleStory,setToggleStory]=useState<boolean>(false)
  const [storyIndex,setStoryIndex]=useState<number>(2);

  const stories:StoryType[]=[
    {
      img:"/picture.jpg",

    },
    {
      img:"/picture.jpg",

    },
    {
      img:"/picture.jpg",

    },
    {
      img:"/picture.jpg",

    },
    {
      img:"/picture.jpg",

    },
    {
      img:"/picture.jpg",

    },
  ]

  
  return (
    <div className='w-full z-10 flex items-center justify-center '>
    <div className="w-full py-4 ">
    {toggleStory && <ToggleStory setStoryIndex={setStoryIndex} toggleStory={toggleStory} setToggleStory={setToggleStory} storyIndex={storyIndex} stories={stories}/>}
               <Swiper
    autoplay={true}
   
    breakpoints={{
      // when window width is >= 640px
     
      // when window width is >= 768px
      "0": {
        slidesPerView: 6,
        autoplay:true,
        spaceBetween:5
      },
      "768": {
        slidesPerView: 8,
        autoplay:true,
        spaceBetween:15
      },
    }}
    className='w-full px-16 z-10  mySwiper  '
   
    modules={[Navigation,]}
    pagination={{ clickable: true }}
    
    
  >
    {
      stories.map((story:StoryType,index:number)=>(
        <SwiperSlide 
        className=''
        key={index}
        ><Story storyindex={index} setStoryIndex={setStoryIndex} setToggleStory={setToggleStory} toggleStory={toggleStory} story={story} /></SwiperSlide>
      ))
    }
       
              </Swiper>
    </div>
    </div>
  )
}

export default StoryContainer