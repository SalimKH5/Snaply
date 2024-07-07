

import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";


import { useEffect, useState } from "react";

import { handleSubmitLike } from "../Serveractions/handleComment";



 




const LikeContainer = ({userId,postId,likes,comment_id}:Likes) => {

    
   const [liked,setLiked]=useState<boolean>(false);
   useEffect(()=>{
    function CheckPostLike(likes:any[],userId:string){

      if(likes.find((like:any)=>like?.userId?._id===userId)){
        setLiked(true)
      }else{
        setLiked(false)
      }
    }
    
    if(likes){
      CheckPostLike(likes,userId)
    }
   
    
   },[likes])

   const handleLike = async () => {
    const newLiked = await handleSubmitLike(liked, userId, postId);
    console.log({newLiked})
    if (typeof newLiked === 'boolean') {
      setLiked(newLiked);
    }
  };



  return (
    <form action={handleLike} >
    {
        !liked?
        <button className="flex items-start justify-center" type="submit">
          <CiHeart   size={comment_id?25:20}   className="cursor-pointer hover:text-[#adadad] hover:scale-150" />
        </button>
        :
        <button className="flex items-start justify-center" type="submit">
                 <FaHeart   size={comment_id?25:20}  className="cursor-pointer text-red-600 hover:scale-150" />

        </button>
    }
    </form>
    
  )
}

export default LikeContainer