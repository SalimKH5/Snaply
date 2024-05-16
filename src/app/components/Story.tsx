"use client"
import Image from 'next/image'
import{ Dispatch, SetStateAction } from 'react'
import ToggleStory from './ToggleStory';

interface StoryType{
  img:string
}
const Story = ({toggleStory,setToggleStory,story,setStoryIndex,storyindex}:{toggleStory:boolean,setToggleStory:Dispatch<SetStateAction<boolean>>,story:StoryType,
  setStoryIndex: Dispatch<SetStateAction<number>>,storyindex:number
}) => {

    

      const handleToggleStory=()=>{
        console.log(toggleStory)
          setToggleStory((prev:boolean)=>true)
          setStoryIndex(storyindex)
          
      }

  return (  
    <>
    
   
    <div  
    onClick={()=>handleToggleStory()}
    className="w-full z-10 flex flex-col items-center gap-1">
     
              <div 
             
              className="border-[#C13584] rounded-full  border-[2px] p-[1px] flex items-center justify-center w-14 h-14  ">
                <img src={story.img}  className='w-full h-full rounded-full object-cover  cursor-pointer  '  alt=""/>
              </div>
            <p>Picture</p>
               
    </div>
    </>
  )
}

export default Story