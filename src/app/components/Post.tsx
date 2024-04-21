import React from 'react'
import PostPicture from "./PostPicture"
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostComment from './PostComment'
const Post = () => {
  return (
    <div>
        <PostHeader />
        <PostPicture/>
        <PostContent/>
        <PostComment/>
    </div>
  )
}

export default Post