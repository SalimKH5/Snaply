
import {  Input } from 'antd'
import { revalidateTag } from 'next/cache';
import { handleSubmitLike } from '../Serveractions/handleComment';



  interface Commented{

    userId:string,
    postId:string
  }


const CommentAction =  ({userId,postId}:Commented) => {
    const updateComment=handleSubmitLike.bind(null,userId,postId)
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