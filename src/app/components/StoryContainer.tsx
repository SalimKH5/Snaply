"use client"

import dynamic from "next/dynamic";
const LazyComponent = dynamic(() => import("./Story"), {
  loading: () =>
    <div
      className={` rounded-full bg-slate-400 animate-pulse  flex items-center justify-center w-16 h-16  `}>

    </div>, // Optional loading component
  ssr: false, // Disable server-side rendering for this component
});
import { Swiper,SwiperSlide  } from 'swiper/react';

//const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), { ssr: false });
//const SwiperSlide = dynamic(() => import('swiper/react').then((mod) => mod.SwiperSlide), { ssr: false });
import { Navigation, } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import "swiper/css/effect-coverflow"
import "swiper/css/autoplay"
import { useState } from 'react';
import ToggleStory from './ToggleStory';
import { useToggleState } from './SearchToggle';

interface StoryType {
  img: string,
  views: boolean,
}



const StoryContainer = () => {
  const [toggleStory, setToggleStory] = useState<boolean>(false)
  const [storyIndex, setStoryIndex] = useState<number>(0);
  const [stories, setStories] = useState<StoryType[]>([
    {
      img: "/picture.jpg",
      views: false,
    },

    {
      img: "/53342199main-des-juifs-jpg.jpg",
      views: false,
    },
    {
      img: "/picture.jpg",
      views: false,
    },

    {
      img: "/53342199main-des-juifs-jpg.jpg",
      views: false,
    },
    {
      img: "/picture.jpg",
      views: false,
    },

    {
      img: "/53342199main-des-juifs-jpg.jpg",
      views: false,
    },
    {
      img: "/picture.jpg",
      views: false,
    },

    {
      img: "/53342199main-des-juifs-jpg.jpg",
      views: false,
    },
    {
      img: "/picture.jpg",
      views: false,
    },

    {
      img: "/53342199main-des-juifs-jpg.jpg",
      views: false,
    },
    {
      img: "/picture.jpg",
      views: false,
    },

    {
      img: "/53342199main-des-juifs-jpg.jpg",
      views: false,
    },
    {
      img: "/picture.jpg",
      views: false,
    },

    {
      img: "/53342199main-des-juifs-jpg.jpg",
      views: false,
    },

  ]);



  return (
    <div className='w-full flex items-center justify-center '>
      <div className="w-full py-6 ">
        {toggleStory && <ToggleStory setStoryIndex={setStoryIndex} toggleStory={toggleStory} setToggleStory={setToggleStory} storyIndex={storyIndex} stories={stories} />}
        <Swiper
          autoplay={true}
          initialSlide={8}
          breakpoints={{
            // when window width is >= 640px

            // when window width is >= 768px
            "0": {
              slidesPerView: 5,
              autoplay: true,
              spaceBetween: 5,

            },
            "768": {
              slidesPerView: stories.length >= 10 ? 8 : 5,
              autoplay: true,
              spaceBetween: 13
            },
          }}
          className='w-full px-16 z-10  mySwiper  flex items-center justify-center'
          speed={500}
          modules={[Navigation,]}
          pagination={{ clickable: true }}
        >
          {
            stories.map((story: StoryType, index: number) => (
              <SwiperSlide
             
                className='swiper-slide'
                key={index}
              ><LazyComponent storyindex={index}
                setStories={setStories}
                setStoryIndex={setStoryIndex} setToggleStory={setToggleStory} toggleStory={toggleStory} story={story} /></SwiperSlide>
            ))
          }

        </Swiper>
      </div>
    </div>
  )
}

export default StoryContainer