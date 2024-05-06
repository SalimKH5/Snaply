
import Sidebar from '../components/Sidebar'
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import { redirect } from "next/navigation";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiDotsHorizontal } from 'react-icons/hi';
import { signOut } from 'next-auth/react';
import BodyContent from '../components/BodyContent';
import Following from '../components/Following';




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



async function getUser(session: any, username: string) {
    const getuser = await fetch(`http://localhost:3000/api/User/${username}`, {
        method: "GET",
        next: { tags: ['user'] },
        cache: "no-cache"
    })
    if (getuser.ok) {
        const result = await getuser.json();
        console.log({user:result.user});
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

        const user: User = await getUser(session, params.username);

       

        return (
            <div className="overflow-y-auto flex h-screen gap-5">
                <div className="hidden md:flex fixed top-0 bottom-0 h-full w-[11%] lg:w-1/6 border-[1px] ">
                    <Sidebar token={session?.user?.token} />
                </div>
                <div className="w-full md:ml-[13%] lg:ml-[25%] px-2 flex-grow flex items-center justify-center  lg:max-w-4xl mx-auto flex-col">
                    <div className='w-full h-full py-10 flex flex-col gap-16  mx-auto'>
                        <div className="w-full flex items-center justify-between max-w-2xl gap-8">
                            <div className="flex-[0.4] flex items-center justify-center ">
                                <div className="border-[#C13584] rounded-full  border-[2px] p-[1px] flex items-center justify-center w-36 h-36  ">
                                    <img src="/picture.jpg" className='w-full h-full rounded-full object-cover  cursor-pointer  ' alt="" />
                                </div>
                            </div>
                            <div className="flex-[0.6] h-full flex flex-col gap-8">
                                <div className=" flex items-center justify-between gap-3 ">
                                    <h1 className='pr-5'>{user.username}</h1>
                                    {
                                        user.username===session?.user.username?
                                        <>
                                        <button className='bg-gray-300 text-sm hover:bg-gray-500 py-1 px-5 rounded-md'>Edite</button>
                                        <button className='bg-gray-300   text-sm hover:bg-gray-500 py-1 px-6 rounded-md'>view archive</button>
                                        <button className='bg-gray-300  hover:bg-gray-500 py-2 px-2 rounded-md'>
                                            <IoPersonAddOutline size={15} />
                                        </button>
                                        </>
                                        :
                                        <>
                                       <Following
                                       FollowingUser={user._id}
                                       
                                       userId={session.user._id}
                                       />
                                        <button className='bg-gray-300  hover:bg-gray-500 py-1 px-5 rounded-md'>Message</button>
                                        <button className='bg-gray-300  hover:bg-gray-500 py-2 px-2 rounded-md'>
                                            <IoPersonAddOutline size={15} />
                                        </button>
                                        </>
                                    }
                                    
                                    <HiDotsHorizontal size="" className="cursor-pointer" />
                                </div>
                                <div className="w-full flex items-center  gap-5 ">
                                    <h1><span className="font-bold">924</span> posts</h1>
                                    <h1><span className="font-bold">{user?.followers?.length}</span> followers</h1>
                                    <h1><span className="font-bold">{user?.follwing?.length}</span> following</h1>
                                </div>
                                <div className="w-full">
                                    <h1 className="font-bold">{session.user.fullName}</h1>
                                </div>
                            </div>

                        </div>

                        <BodyContent username={params.username}/>

                    </div>
                </div>
            </div>

        )
    }
}

export default page