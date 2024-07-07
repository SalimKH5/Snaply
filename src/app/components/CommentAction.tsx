"use client"
import {  Input } from 'antd'

import { handleSubmitComment } from '../Serveractions/handleComment';







const CommentAction =  ({userId,postId}:Commented) => {
    const updateComment=handleSubmitComment.bind(null,userId,postId)
  return (
    <form action={updateComment}  className='w-full flex items-center gap-3 '>
        <Input
        name="TextComment"   
        className=' flex-1  placeholder:text-black' placeholder='Add a comment' />
        <button type='submit'>Post</button> 
    </form>
  )
}

export default CommentAction