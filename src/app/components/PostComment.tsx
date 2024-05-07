import { Button, Input } from 'antd'
import { revalidateTag } from 'next/cache';
import React from 'react'
import TogglePost from './TogglePost';
import CommentAction from './CommentAction';
import Api from "../ApiConfig"



const handleSubmitLike = async (userId: string, postId: string,e:FormData,) => {
    'use server'
    console.log("hello comment")
    const TextComment=e.get('TextComment');
    if(TextComment!=""){
        
        try {
      const response = await fetch(`${Api.posts+postId}/commentPost`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment:{
            TextComment:TextComment,
            userId:userId
          }
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const updatedData = await response.json(); // Handle success response if needed
      
      e.set('TextComment'," ")
      // Update local state or revalidate cached data here (if applicable)
  
      revalidateTag("posts"); // Revalidate cache tag
    } catch (error) {
      console.error("Error liking post:", error); // Handle errors gracefully
    }
    }
    
  };
  
interface Comments{  
  userId:string,
  postId:string,
  comments: any[],
  src:string
  title:string,
  postby:{
      _id: string,
      username: string,
  },
}
const PostComment = async({userId,postId,comments,src,postby,title}:Comments) => {


    const updateComment=handleSubmitLike.bind(null,userId,postId)
    return (
    <div className="w-full py-2 flex gap-2 flex-col">
      <TogglePost
      toggle={
        <div className="w-full">
                <span  className="text-gray-500 font-bold cursor-pointer">Review all  {comments.length} comments ...</span>
        </div>
      }
      src={src}
      comments={comments}
      postby={postby}
      title={title}
      userId={userId}
      postId={postId}
      />
       <CommentAction
       postId={postId}
       userId={userId}
       />
    </div>

       
    )
}

export default PostComment