import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

import { IoIosArrowBack,IoIosArrowForward  } from "react-icons/io";
const ToggleStory = () => {
    return (
        <div className='w-screen h-screen py-2 z-[99999] fixed top-0 bottom-0 left-0 right-0 bg-[#0f0202] '>
            <Link href="/" className="w-full py-2">
                <Image src="/instagram-logo-white.png" alt="" width={120} height={60} />
            </Link>
            <div className="w-full h-full fixed top-0 left-0 flex gap-4 py-5 items-center justify-center">
            <div className="w-32 h-[38vh]  flex items-center justify-center">
                    <div className="w-full h-[50vh] rounded-lg relative bg-[#d2d2d611]  ">
                        <div className="w-full absolute top-0 bottom-0 h-full z-[999] flex items-center justify-center">
                                <h1 className='text-white font-extrabold'>SalimKhadir</h1>
                        </div>
                        
                        <div className="w-full absolute rounded-xl top-0 bottom-0 bg-slate-400 opacity-40  h-full z-[999] flex items-center justify-center">
                              
                        </div>
                        
                        <div className="w-full h-full z-[10]  relative ">
                            <Image src="/picture.jpg" alt="" fill className='object-contain'/>
                        </div>
                    </div>                
                </div>
                <div className="w-32 h-[38vh]  flex items-center justify-center">
                    <div className="w-full h-[50vh] rounded-lg relative bg-[#d2d2d611]  ">
                        <div className="w-full absolute top-0 bottom-0 h-full z-[999] flex items-center justify-center">
                                <h1 className='text-white font-extrabold'>SalimKhadir</h1>
                        </div>
                        
                        <div className="w-full absolute rounded-xl top-0 bottom-0 bg-slate-400 opacity-40  h-full z-[999] flex items-center justify-center">
                              
                        </div>
                        
                        <div className="w-full h-full z-[10]  relative ">
                            <Image src="/picture.jpg" alt="" fill className='object-contain'/>
                        </div>
                    </div>                
                </div>
                
                <div className="h-full w-16 flex items-center justify-center">
                    <div className="w-6 h-6 p-1 rounded-full cursor-pointer bg-white flex items-center justify-center">
                        <IoIosArrowBack />
                    </div>

                </div>
                <div className="w-72 h-[98vh] rounded-lg relative bg-[#d2d2d611] ">
                    <div className="w-full absolute top-1 z-50 h-8 flex items-center gap-[1px]">
                        <div className="w-full   bg-gray-400 h-[2px]"></div>
                        <div className="w-full  bg-gray-400 h-[2px]"></div>
                        <div className="w-full   bg-gray-400 h-[2px]"></div>
                    </div>
                    <div className="w-full h-full z-[10]  relative">
                        <Image src="/picture.jpg" alt="" fill className='object-contain'/>
                    </div>
                </div>
                <div className="h-full w-16 flex items-center justify-center">
                    <div className="w-6 h-6 p-1 rounded-full cursor-pointer bg-white flex items-center justify-center">
                        <IoIosArrowForward />
                    </div>

                </div>
              
                <div className="w-32 h-[38vh]  flex items-center justify-center">
                    <div className="w-full h-[50vh] rounded-lg relative bg-[#d2d2d611]  ">
                        <div className="w-full absolute top-0 bottom-0 h-full z-[999] flex items-center justify-center">
                                <h1 className='text-white font-extrabold'>SalimKhadir</h1>
                        </div>
                        
                        <div className="w-full absolute rounded-xl top-0 bottom-0 bg-slate-400 opacity-40  h-full z-[999] flex items-center justify-center">
                              
                        </div>
                        
                        <div className="w-full h-full z-[10]  relative ">
                            <Image src="/picture.jpg" alt="" fill className='object-contain'/>
                        </div>
                    </div>                
                </div>
                <div className="w-32 h-[38vh]  flex items-center justify-center">
                    <div className="w-full h-[50vh] rounded-lg relative bg-[#d2d2d611]  ">
                        <div className="w-full absolute top-0 bottom-0 h-full z-[999] flex items-center justify-center">
                                <h1 className='text-white font-extrabold'>SalimKhadir</h1>
                        </div>
                        
                        <div className="w-full absolute rounded-xl top-0 bottom-0 bg-slate-400 opacity-40  h-full z-[999] flex items-center justify-center">
                              
                        </div>
                        
                        <div className="w-full h-full z-[10]  relative ">
                            <Image src="/picture.jpg" alt="" fill className='object-contain'/>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    )
}

export default ToggleStory