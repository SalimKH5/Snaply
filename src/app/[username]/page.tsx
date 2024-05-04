import React from 'react'
import Sidebar from '../components/Sidebar'
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import { redirect } from "next/navigation";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiDotsHorizontal } from 'react-icons/hi';

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/account/Login')
    }
    if (session) {

        console.log({ session });

        return (
            <div className="overflow-y-auto flex h-screen gap-5">
                <div className="hidden md:flex fixed top-0 bottom-0 h-full w-[11%] lg:w-1/6 border-[1px] ">
                    <Sidebar token={session?.user?.token} />
                </div>
                <div className="w-full md:ml-[13%] lg:ml-[25%] px-2 flex-grow flex items-center justify-center  lg:max-w-2xl mx-auto flex-col">
                    <div className='w-full h-full py-10 flex flex-col gap-16 max-w-2xl mx-auto'>
                        <div className="w-full flex items-center justify-between gap-8">
                            <div className="flex-[0.5] flex items-center ">
                                <div className="border-[#C13584] rounded-full  border-[2px] p-[1px] flex items-center justify-center w-36 h-36  ">
                                    <img src="/picture.jpg" className='w-full h-full rounded-full object-cover  cursor-pointer  ' alt="" />
                                </div>


                            </div>
                            <div className="flex-[0.5] h-full flex flex-col gap-8">
                                <div className=" flex items-center justify-between gap-3 ">
                                    <h1 className='pr-5'>{session.user.username}</h1>
                                    <button className='bg-gray-300 hover:bg-gray-500 py-1 px-5 rounded-md'>Following</button>
                                    <button className='bg-gray-300  hover:bg-gray-500 py-1 px-5 rounded-md'>Message</button>
                                    <button className='bg-gray-300  hover:bg-gray-500 py-2 px-2 rounded-md'>
                                        <IoPersonAddOutline size={15}/>
                                    </button>
                                    <HiDotsHorizontal size="" className="cursor-pointer"/>
                                </div>
                                <div className=" flex items-center  gap-5 ">
                                   <h1><span className="font-bold">924</span> posts</h1>
                                   <h1><span className="font-bold">201K</span> followers</h1>
                                   <h1><span className="font-bold">0</span> following</h1>
                                </div>
                                <div className="w-full">
                                    <h1 className="font-bold">{session.user.username}</h1>
                                </div>
                            </div>

                        </div>

                        <div className="w-full">
                            <hr />
                            <div className="w-full flex items-center justify-center gap-2">
                                        <button className='border-t-2 px-5 border-black'>Posts</button>
                                        <button className='border-t-2 px-5 border-black'>Reels</button>
                                        <button className='border-t-2 px-5 border-black'>Tagged</button>
                                        
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        )
    }
}

export default page