import React from 'react'
import Sidebar from './Sidebar'
import StoryContainer from './StoryContainer'
import Post from './Post'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";
import { signOut } from 'next-auth/react'
import Image from 'next/image'


interface Posts{
  username: string,
  PathFile: string,
  _id: string,
  postId: string,
  title:string,
  likes: any[],
  comments: any[];
  postby:{
    _id: string,
    username: string,
  }
}


async function getPosts(session:any){
  const getPosts=await fetch('http://localhost:3000/api/posts/',{
    method:"GET",
    headers:{
      Authorization: `Bearer ${session?.user?.token}`, // Fix typo in 'Authorization'
    },
  

    next: { tags: ['posts']}, 
    cache:"no-cache"
  })
  if(getPosts.ok){
    const result=await getPosts.json();
  return result?.posts;
  }else if(getPosts.status==401){
    signOut()
  }
  
   return [];
    
}

const  MainComponent = async () => {

 

  const session = await getServerSession(authOptions);
  
  if(!session){
    redirect('/account/Login')
  }
  if(session){
    
    let posts: Posts[]=await getPosts(session);
      
  return (
    <div className="overflow-y-auto flex h-screen gap-5">
    <div className="hidden md:flex fixed top-0 bottom-0 h-full w-[11%] lg:w-1/6 border-[1px] ">
         <Sidebar token={session?.user?.token}/>
    </div>
    <div className="w-full md:ml-[13%] lg:ml-[20%] flex-grow flex items-center max-w-[650px] lg:max-w-2xl mx-auto flex-col">
      <div className="w-full md:max-w-2xl">
            <StoryContainer/>
            <div className="w-full  flex justify-center items-center">
                  <div className="w-full h-full max-w-lg p-1 md:p-3 flex flex-col  justify-center gap-6">
                  {
                    posts?.map((post:Posts,index:number)=>(
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
            <div className="w-full  flex py-8">
              <div className="w-full h-full flex  gap-2">
                        <div className="w-16 h-12 relative  flex items-center justify-center">
                            <Image src="/profile.png" alt="" fill objectFit='cover' className='rounded-full border-[0.5px] border-[#000000] '/>
                        </div>
                        <div className="w-full flex flex-col">
                              <p>{session.user.username}</p>
                                <p>{session.user.fullName}</p>
                        </div>
              </div>
               
                  
            </div>
    </div>
  </div>
  )
}

}

export default MainComponent