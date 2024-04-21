import React from 'react'
import Sidebar from './Sidebar'
import StoryContainer from './StoryContainer'
import Post from './Post'
import { getServerSession } from 'next-auth'
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
const  MainComponent = async () => {

 

  const session = await getServerSession(authOptions);

  if(!session){
    redirect('/account/Login')
  }
  
    


  return (
    <div className="overflow-y-auto flex h-screen gap-2">
    <div className="hidden md:flex fixed top-0 bottom-0 h-full w-[11%] lg:w-1/5 border-[1px] ">
         <Sidebar token={session?.user?.token}/>
    </div>
    <div className="md:ml-[12%] lg:ml-[25%] flex-grow flex items-center max-w-[650px] lg:max-w-4xl mx-auto flex-col">
      <div className="w-full max-w-2xl">
            <StoryContainer/>
            <div className="w-full h-full p-3 flex flex-col gap-6">
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            </div>
      </div> 
    
    </div>
    <div className=" h-full hidden lg:flex lg:w-1/5 "></div>
  </div>
  )
}

export default MainComponent