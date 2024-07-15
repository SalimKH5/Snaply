import React from 'react'
import dynamic from "next/dynamic";

const LazyComponent = dynamic(() => import("./PostPicture"), {
  loading: () => 
  <div className='bg-slate-300 rounded-lg animate-pulse w-full h-full min-h-[30rem] relative'>

  </div>, // Optional loading component
  ssr: false, // Disable server-side rendering for this component
});

import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostComment from './PostComment'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/lib/authOptions";




const Post =  ({post,userID}:{post:Post,userID:string}) => {
 
  
  return (  
    <div className='flex flex-col gap-1'>
        <PostHeader username={post?.postby.username} />
        <LazyComponent src={post.PathFile}/>
        <PostContent
        comments={post.comments}
        src={post.PathFile}
        userId={userID}
        postId={post._id} likes={post.likes} title={post.title} postby={post.postby}/>
        <PostComment
        likes={post.likes}
        comments={post.comments}
        userId={userID}
        src={post.PathFile}
        postby={post.postby}
        title={post.title}
        postId={post._id}
        />
        <hr/>
    </div>
  )
}

export default Post