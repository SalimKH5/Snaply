
import React from 'react'
import Sidebar from './Sidebar'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";
import { signOut } from 'next-auth/react'
import Api from "../ApiConfig"
import Navbar from './Navbar'
import BottmNavigation from './BottmNavigation'
import RightContainer from './RightContainer'

interface GetPostsResponse {
  posts: Post[];
  loading: boolean;
}


async function getPosts(session: any, loading: boolean): Promise<GetPostsResponse> {
  loading = true;
  const getPosts = await fetch(Api.posts, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.token}`, // Fix typo in 'Authorization'
    },


    next: { tags: ['posts'] },
    cache: "no-cache"
  })
  if (getPosts.ok) {
    loading = false
    const result = await getPosts.json();

    return { posts: result?.posts ?? [], loading:false };
  } else if (getPosts.status == 401) {
    loading = false
    signOut();
    return { posts: [], loading };
  } else if (getPosts.status == 500) {
    loading = false
    return { posts: [], loading };
  }
  return { posts: [], loading };

}

const MainComponent = async () => {

  let loading: boolean = true

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/account/Login')
  }
  if (session) {

    const result = await getPosts(session, loading);

    return (
      result?.loading ?
        <div className='W-screen flex items-center justify-center h-screen fixed top-0 bottom-0 right-0 left-0'>
          <p>hello wolrd</p>
        </div>
        :
        <div className="overflow-y-auto flex h-screen gap-5">
          <Navbar />
          <BottmNavigation token={session?.user?.token}  username={session?.user?.username}/>
          <Sidebar token={session?.user?.token} username={session?.user?.username} />
          <RightContainer
            _id={session?.user?._id} 
            fullName={session?.user?.fullName} 
            username={session?.user?.username} 
            loading={result?.loading }
            posts={result?.posts} />
        </div>
    )
  }

}

export default MainComponent