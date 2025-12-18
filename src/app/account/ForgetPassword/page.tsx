
import PasswordForget from '@/app/components/PasswordForget'
import Image from 'next/image'

import React from 'react'

const page = () => {
    return (
        <div className=' w-full h-full relative flex-[0.6]'>
            <div className="w-screen  sticky py-3 px-5 top-0 border-b-[1px] border-gray-300 shadow-sm">
                <Image src="/snaply-desk.png"  width={60} height={80} alt="logo snaply" />
            </div>
           <PasswordForget />
        </div>
    )
}

export default page