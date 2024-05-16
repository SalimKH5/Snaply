"use client"
import Link from "next/link";
import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import ToggleStory from "./ToggleStory";



interface StoryType{
  img:string
}





const PostHeader = ({username}:{username:String}) => {

  const [toggleStory,setToggleStory]=useState<boolean>(false)
  const [storyIndex,setStoryIndex]=useState<number>(0);

  const stories:StoryType[]=[
    {
      img:"/picture.jpg",

    },
  ]

  const handleToggleStory=()=>{
    console.log(toggleStory)
      setToggleStory((prev:boolean)=>true)
  }
  return (
    <div className='w-full flex items-center justify-between px-1 py-1'>
      {toggleStory && <ToggleStory setStoryIndex={setStoryIndex} toggleStory={toggleStory} setToggleStory={setToggleStory} storyIndex={storyIndex} stories={stories}/>}
        <div className="flex items-center gap-2">
                    <div 
                      onClick={()=>handleToggleStory()}
                    className="border-[#C13584] rounded-full  border-[2px] p-[1px] flex items-center justify-center w-8 h-8  ">
                            <img src="/picture.jpg"  className='w-full h-full rounded-full object-cover  cursor-pointer  '  alt=""/>
                    </div>
                    <div className="flex flex-col ">
                        <Link href={`/${username}`}className='text-sm font-bold'>{username}</Link>
                      
                    </div>
        </div> 
        <div className="">
            <HiDotsHorizontal size="" className="cursor-pointer"/>
        </div>
        

    </div>
  )
}

export default PostHeader