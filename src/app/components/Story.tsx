"use client"
import Image from 'next/image'
import{ Dispatch, SetStateAction } from 'react'
import ToggleStory from './ToggleStory';

const Story = ({toggleStory,setToggleStory}:{toggleStory:boolean,setToggleStory:Dispatch<SetStateAction<boolean>>}) => {

    

      const handleToggleStory=()=>{
        console.log(toggleStory)
          setToggleStory((prev:boolean)=>true)

          
      }

      console.log(toggleStory)
  return (  
    <>
    
   
    <div  
    onClick={()=>handleToggleStory()}
    className="w-full flex flex-col items-center gap-1">
     
              <div 
             
              className="border-[#C13584] rounded-full  border-[2px] p-[1px] flex items-center justify-center w-14 h-14  ">
                <img src="/picture.jpg"  className='w-full h-full rounded-full object-cover  cursor-pointer  '  alt=""/>
              </div>
            <p>Picture</p>
               
    </div>
    </>
  )
}

export default Story