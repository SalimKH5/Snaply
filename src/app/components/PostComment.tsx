import { Button, Input } from 'antd'
import React from 'react'

const PostComment = () => {
    return (
        <form className='w-full flex items-center gap-3 '>
            <Input className=' flex-1  placeholder:text-black' placeholder='Add a comment' />
            <Button>Post</Button> 
        </form>
    )
}

export default PostComment