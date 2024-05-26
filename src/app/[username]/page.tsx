
import Sidebar from '../components/Sidebar'
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import { redirect, useRouter } from "next/navigation";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiDotsHorizontal } from 'react-icons/hi';
import { signOut } from 'next-auth/react';
import BodyContent from '../components/BodyContent';
import Following from '../components/Following';
import api from "../ApiConfig"
import Link from 'next/link';



interface User {
    _id: string,
    email: string,
    hashPassword: string,
    fullName: string,
    username: string,
    saveposts: Post[],
    followers: any[],
    follwing: any[]
}


interface Post {
    _id: string,
    PathFile: string,
    title: string,
    likes: [
        {
            userId: string,
            _id: string,
        },
    ],
    postby: {
        _id: string,
        username: string
    },
    comments: [
        {
            TextComment: string,
            userId: string,
            _id: string,
            likes: [
                {
                    userId: string,
                    _id: string,
                }
            ]
        },
    ],
    created: string,
}



async function getUser(username: string) {
    const getuser = await fetch(api.User+username, {
        method: "GET",
        next: { tags: ['users'] },
        cache: "no-cache"
    })
  
    if (getuser.ok) {
        const result = await getuser.json();
       
        
        return result?.user;
    } else if (getuser.status == 401) {
        signOut()
    }

    return [];

}









const page = async ({ params }: { params: { username: string } }) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/account/Login')
    }
    if (session) {
       
        const user: User = await getUser(params.username);

       if(user){

        return (
            
                <div className="w-full h-full md:ml-[13%] lg:ml-[25%] px-2 flex-grow flex items-center justify-center py-8  lg:max-w-4xl mx-auto flex-col ">
                    <div className='w-full h-full  py-10 flex flex-col gap-5 lg:gap-16  mx-auto'>
                        <div className="w-full flex items-center justify-between max-w-xl lg:max-w-2xl gap-4 lg:gap-8">
                            <div className="flex-[0.4] flex items-center justify-center ">
                                <div className="border-[#C13584] rounded-full  border-[2px] p-[1px] flex items-center justify-center 
                                w-20 h-20
                                lg:w-36 lg:h-36  ">
                                    <img src="/picture.jpg" className='w-full h-full rounded-full object-cover  cursor-pointer  ' alt="" />
                                </div>
                            </div>
                            <div className="flex-[0.6] h-full flex flex-col gap-4 lg:gap-8">
                                <div className=" flex flex-col md:flex-row items-center justify-between gap-3 lg:gap-3 ">
                                    <h1 className='pr-5 text-sm'>{user?.username}</h1>
                                    {
                                        user.username===session?.user.username?
                                        <div className='flex items-center flex-row gap-2 lg:gap-3'>
                                                <Link href={`/${user.username}/Edite`} className='bg-gray-300 text-[8px] lg:text-sm hover:bg-gray-500 py-1 px-2 rounded-md'>Edite</Link>
                                                <button className='bg-gray-300 text-[8px] box-border  lg:text-sm hover:bg-gray-500 py-1 px-2 rounded-md'>view archive</button>
                                                
                                        </div>
                                        :
                                        <div className='flex items-center flex-row gap-2 lg:gap-3'>
                                       <Following
                                       FollowingUser={user._id}
                                       
                                       userId={session.user._id}
                                       />
                                        <button className='bg-gray-300  hover:bg-gray-500 py-1 px-5 rounded-md'>Message</button>
                                       
                                        </div>
                                    }
                                    <button className='bg-gray-300 hidden lg:flex  hover:bg-gray-500 py-2 px-2 rounded-md'>
                                                    <IoPersonAddOutline size={15}  />
                                                </button>
                                    <HiDotsHorizontal size="" className="cursor-pointer hidden lg:flex " />
                                </div>
                                <div className="w-full  items-center  gap-5 hidden lg:flex">
                                    <h1><span className="font-bold">924</span> posts</h1>
                                    <h1><span className="font-bold">{user?.followers?.length}</span> followers</h1>
                                    <h1><span className="font-bold">{user?.follwing?.length}</span> following</h1>
                                </div>
                                <div className="w-full">
                                    <h1 className="font-bold">{user?.fullName}</h1>
                                </div>
                            </div>

                        </div>

                        <BodyContent username={params.username}/>

                    </div>
                </div>
         

            )
        }
    }

}

export default page