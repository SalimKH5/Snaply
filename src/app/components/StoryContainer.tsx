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

interface StoryType {
  img: string,
  views: boolean,
}



const StoryContainer = () => {
  const [toggleStory, setToggleStory] = useState<boolean>(false)
  const [storyIndex, setStoryIndex] = useState<number>(2);
  const [stories, setStories] = useState<StoryType[]>([
    {
      img: "/picture.jpg",
      views: false,
    },
    {
      img: "/picture.jpg",
      views: false,
    },
    {
      img: "/picture.jpg",
      views: false,
    },
    {
      img: "/picture.jpg",
      views: false,
    },
    {
      img: "/picture.jpg",
      views: false,
    },
  ]);



  return (
    <div className='w-full z-10 flex items-center justify-center '>
      <div className="w-full py-6 ">
        {toggleStory && <ToggleStory setStoryIndex={setStoryIndex} toggleStory={toggleStory} setToggleStory={setToggleStory} storyIndex={storyIndex} stories={stories} />}
        <Swiper
          autoplay={true}
          breakpoints={{
            // when window width is >= 640px

            // when window width is >= 768px
            "0": {
              slidesPerView: 5,
              autoplay: true,
              spaceBetween: 5,

            },
            "768": {
              slidesPerView: 8,
              autoplay: true,
              spaceBetween: 15
            },
          }}
          className='w-full px-16 z-10  mySwiper  flex items-center justify-center'

          modules={[Navigation,]}
          pagination={{ clickable: true }}


        >
          {
            stories.map((story: StoryType, index: number) => (
              <SwiperSlide
                className=''
                key={index}
              ><Story storyindex={index}
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