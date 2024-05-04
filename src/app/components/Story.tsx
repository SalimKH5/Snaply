import Image from 'next/image'
import React from 'react'

const Story = () => {
  return (
    <div className="w-full flex flex-col items-center gap-1">
              <div className="border-[#C13584] rounded-full  border-[2px] p-[1px] flex items-center justify-center w-14 h-14  ">
                <img src="/picture.jpg"  className='w-full h-full rounded-full object-cover  cursor-pointer  '  alt=""/>
              </div>
            <p>Picture</p>
               
    </div>
       
  )
}

export default Story