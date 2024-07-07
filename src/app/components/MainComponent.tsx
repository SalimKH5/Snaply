
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




async function getPosts(session: any, loading: boolean) {
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

    return result?.posts;
  } else if (getPosts.status == 401) {
    loading = false
    signOut();
  } else if (getPosts.status == 500) {
    loading = false
  }

  return [];

}

const MainComponent = async () => {

  const loading: boolean = false

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/account/Login')
  }
  if (session) {

    let posts: Post[] = await getPosts(session, loading);

    return (
      <div className="overflow-y-auto flex h-screen gap-5">
        <Navbar />
        <BottmNavigation token={session?.user?.token} />
        <Sidebar token={session?.user?.token} />
        <RightContainer _id={session?.user?._id} fullName={session?.user?.fullName} username={session?.user?.username} loading={loading} posts={posts} />
      </div>
    )
  }

}

export default MainComponent