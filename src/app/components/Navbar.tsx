import { Input } from 'antd';
import Image from 'next/image'
import React from 'react'
import { CiSearch } from "react-icons/ci";
const Navbar = () => {
    return (
        <div className='w-full iniline md:hidden z-[99999] px-3 py-2 fixed top-0 bg-white shadow-lg'>
            <div className="flex w-full px-5  items-center justify-between">
                <div className="flex-[0.4]">
                <div className={`w-[80px] h-[40px] flex items-center  relative`}>
                    <Image src="/instagram-logo-1-1024x366.svg" className={`object-contain   cursor-pointer `} alt="" fill />
                </div>        
                </div>
                
                <div className="flex-1 flex items-center bg-slate-300 px-2 rounded-lg">
                            <CiSearch className='flex-[0.1]'/>
                            <Input allowClear placeholder='Search' className='flex-1 bg-transparent outline-none' />
                </div>
            </div>
        </div>
    )
}

export default Navbar