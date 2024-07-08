"use client"
import Image from 'next/image'
import{ Dispatch, SetStateAction, useState } from 'react'
import ToggleStory from './ToggleStory';

interface StoryType{
  img:string,
  views:boolean,
}
const Story = ({toggleStory,setToggleStory,story,setStoryIndex,storyindex,setStories}:{toggleStory:boolean,setToggleStory:Dispatch<SetStateAction<boolean>>,story:StoryType,
  setStoryIndex: Dispatch<SetStateAction<number>>,storyindex:number,setStories:Dispatch<SetStateAction<StoryType[]>>
}) => {

      const handleToggleStory=()=>{
   
          setToggleStory((prev:boolean)=>true)
          setStoryIndex(storyindex)
          setStoryOnClick(true);
          
      }


      const [storyOnClick,setStoryOnClick]=useState<boolean>(false);

  return (  
    <>
    
   
    <div  
    onClick={()=>handleToggleStory()}
    className="w-full -z-10 flex flex-col items-center gap-1">
     
              <div 
             
              className={`${!storyOnClick?"bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]":"border-gray-300 border-[2px]"} rounded-full  flex items-center justify-center w-16 h-16  `}>
                <img src={story.img}  className='w-full h-full rounded-full p-[2px] hover:rotate-6 bg-white object-cover  cursor-pointer  '  alt=""/>
              </div>
            <p>Picture</p>
               
    </div>
    </>
  )
}

export default Story