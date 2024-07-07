import { Button, Input } from 'antd'
import { revalidateTag } from 'next/cache';
import React from 'react'
import TogglePost from './TogglePost';
import CommentAction from './CommentAction';
import Api from "../ApiConfig"
import { handleSubmitComment } from '../Serveractions/handleComment';




  
const PostComment = ({userId,postId,comments,src,postby,title,likes}:Comments) => {


 
    return (
    <div className="w-full py-2 flex gap-2 flex-col">
      <TogglePost
      likes={likes}
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