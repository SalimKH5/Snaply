
import ResetPass from '@/app/components/ResetPass'
import Image from 'next/image'
import React from 'react'

const page = () => {
   
 
    return (
        <div className=' w-full h-full relative flex-[0.6]'>
            <div className="w-screen  sticky py-3 px-5 top-0 border-b-[1px] border-gray-300 shadow-sm">
                <Image src="/instagram-logo-1-1024x366.svg" width={120} height={80} alt="logo instagram" />
            </div>
            <ResetPass />
        </div>
    )
}

export default page