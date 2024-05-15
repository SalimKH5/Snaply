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
const StoryContainer = () => {
  const [toggleStory,setToggleStory]=useState<boolean>(false)
  return (
    <>
    <div className="w-full py-4">
    {toggleStory && <ToggleStory/>}
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
    className=' px-16  mySwiper'
   
    modules={[Navigation,]}
    pagination={{ clickable: true }}
    
    
  >
       <SwiperSlide ><Story setToggleStory={setToggleStory} toggleStory={toggleStory}/></SwiperSlide>
       <SwiperSlide ><Story setToggleStory={setToggleStory} toggleStory={toggleStory}/></SwiperSlide>
       <SwiperSlide ><Story setToggleStory={setToggleStory} toggleStory={toggleStory}/></SwiperSlide>
       <SwiperSlide ><Story setToggleStory={setToggleStory} toggleStory={toggleStory}/></SwiperSlide>
       <SwiperSlide ><Story setToggleStory={setToggleStory} toggleStory={toggleStory}/></SwiperSlide>
       <SwiperSlide ><Story setToggleStory={setToggleStory} toggleStory={toggleStory}/></SwiperSlide>
       <SwiperSlide ><Story setToggleStory={setToggleStory} toggleStory={toggleStory}/></SwiperSlide>
       <SwiperSlide ><Story setToggleStory={setToggleStory} toggleStory={toggleStory}/></SwiperSlide>
       <SwiperSlide ><Story setToggleStory={setToggleStory} toggleStory={toggleStory}/></SwiperSlide>
       <SwiperSlide ><Story setToggleStory={setToggleStory} toggleStory={toggleStory}/></SwiperSlide>
       <SwiperSlide ><Story setToggleStory={setToggleStory} toggleStory={toggleStory}/></SwiperSlide>
      
      
  </Swiper>
    </div>
    </>
  )
}

export default StoryContainer