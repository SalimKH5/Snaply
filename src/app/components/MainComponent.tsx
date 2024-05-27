import React from 'react'
import Sidebar from './Sidebar'
import StoryContainer from './StoryContainer'
import Post from './Post'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Api from "../ApiConfig"
import { useToggleState } from './SearchToggle'
import Navbar from './Navbar'
import BottmNavigation from './BottmNavigation'
import { Spin } from 'antd'

interface Posts {
  username: string,
  PathFile: string,
  _id: string,
  postId: string,
  title: string,
  likes: any[],
  comments: any[];
  postby: {
    _id: string,
    username: string,
  }
}


async function getPosts(session: any,loading:boolean) {
  loading=true;
  const getPosts = await fetch(Api.posts, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.token}`, // Fix typo in 'Authorization'
    },


    next: { tags: ['posts'] },
    cache: "no-cache"
  })
  if (getPosts.ok) {
    loading=false
    const result = await getPosts.json();

    return result?.posts;
  } else if (getPosts.status == 401) {
    loading=false
    signOut();
  }else if(getPosts.status==500){
    loading=false
  }

  return [];

}

const MainComponent = async () => {

  const loading:boolean=false

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/account/Login')
  }
  if (session) {

    let posts: Posts[] = await getPosts(session,loading);

    return (
      <div className="overflow-y-auto flex h-screen gap-5">
                    <Navbar/>
                    <BottmNavigation  token={session?.user?.token}/>
        <Sidebar token={session?.user?.token} />
        <div className="w-full md:ml-[13%]  lg:ml-[20%] flex-grow flex items-center max-w-[650px] lg:max-w-2xl mx-auto flex-col">
          <div className="w-full md:max-w-[46rem] flex justify-center items-center flex-col py-9 ">
            <StoryContainer />
            <div className="w-full  flex justify-center items-center">
              <div className="w-full h-full max-w-lg p-1 md:p-3 flex flex-col  justify-center gap-6">
                {
                  loading?
                  <Spin/>:
                  
                  posts?.map((post: Posts, index: number) => (
                    <Post
                      userID={session.user._id}
                      key={index} post={post} />
                  ))
                }


              </div>
            </div>

          </div>

        </div>
        <div className=" h-full hidden min-[1200px]:flex lg:w-1/6 ">
          <div className="w-full h-full flex py-8">
            <Link href={`/${session.user.username}`} className="w-full  flex  gap-2">
              <div className="w-16 h-12 relative  flex items-center justify-center">
                <Image src="/profile.png" alt="" fill objectFit='cover' className='rounded-full border-[0.5px] border-[#000000] ' />
              </div>
              <div className="w-full flex flex-col">
                <p>{session.user.username}</p>
                <p>{session.user.fullName}</p>
              </div>
            </Link>


          </div>
        </div>
      </div>
    )
  }

}

export default MainComponent