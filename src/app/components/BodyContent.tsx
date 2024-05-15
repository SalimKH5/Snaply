import { signOut } from 'next-auth/react'
import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { ImPlay2 } from 'react-icons/im'
import { LiaTableSolid } from 'react-icons/lia'
import { redirect, useSearchParams } from "next/navigation";
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/authOptions';
import TogglePost from './TogglePost'
import Image from 'next/image'
import api from "../ApiConfig"
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



async function getPosts(session: any, username: string) {
    const getposts = await fetch(`${api.User+username}/posts`, {
        method: "GET",
        //   headers:{
        //     Authorization: `Bearer ${session?.user?.token}`, // Fix typo in 'Authorization'
        //   },
        next: { tags: ['posts'] },
        cache: "no-cache"
    })
    if (getposts.ok) {
        const result = await getposts.json();
     
        return result?.posts;
    } else if (getposts.status == 401) {
        signOut()
    }

    return [];

}






const BodyContent = async ({username}:{username:string}) => {
    const session = await getServerSession(authOptions);

    
    if (!session) {
        redirect('/account/Login')
    }
    if (session) {
    const posts: Post[] = await getPosts(session,username);

    console.log({posts});
  return (
    <div className="w-full py-5">
                            <hr />
                            <div className="w-full flex items-center justify-center gap-10">
                                <button className='border-t-[1px] py-3 px-5 border-black flex items-center gap-1'>
                                    <LiaTableSolid />
                                    <h1>Posts</h1>
                                </button>
                                <button

                                    className='border-t-[1px] py-3 px-5 border-black  flex items-center gap-1'>
                                    <BsFillPersonFill />
                                    <h1>TAGGED</h1>
                                </button>

                            </div>

                            <div className="w-full h-auto grid grid-cols-3 gap-[3px] ">
                                {
                                    posts.map((post: Post,index:number) => (
                                        <div 
                                        key={index}
                                        className='w-full relative h-32 lg:h-60 cursor-pointer '>
                                            <TogglePost

                                                toggle={<Image src={`${post.PathFile}`} className='rounded-sm object-cover ' alt="" fill />}
                                                src={post.PathFile}
                                                comments={post.comments}
                                                postby={post.postby}
                                                title={post.title}
                                                userId={session.user._id}
                                                postId={post._id}
                                            />

                                        </div>
                                    ))
                                }


                            </div>


                        </div>
  )
}

}

export default BodyContent