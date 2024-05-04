import React from 'react'
import PostPicture from "./PostPicture"
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostComment from './PostComment'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/lib/authOptions";

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



const Post = async ({post,userID}:{post:Posts,userID:string}) => {
 
  
  return (  
    <div className='flex flex-col gap-1'>
        <PostHeader username={post?.postby.username} />
        <PostPicture src={post.PathFile}/>
        <PostContent
        comments={post.comments}
        src={post.PathFile}
        userId={userID}
        postId={post._id} likes={post.likes} title={post.title} postby={post.postby}/>
        <PostComment
        comments={post.comments}
        userId={userID}
        src={post.PathFile}
        postby={post.postby}
        title={post.title}
        postId={post._id}
        />
    </div>
  )
}

export default Post