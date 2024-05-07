

import { revalidateTag } from "next/cache";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import api from "../ApiConfig"
interface Likes{
    userId:string
    postId:string
    likes:any[],
    comment_id:string|null
}

async function CheckPostLike(likes:any[],userId:string){

  if(likes.find((like:any)=>like?.userId?._id===userId)){
    return true
  }
  return false
}

const handleSubmitLike = async (liked: boolean, userId: string, postId: string) => {
 
  'use server'

  try {
    const response = await fetch(`${api.posts+postId}/likePost`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        liked: !liked,
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const updatedData = await response.json(); // Handle success response if needed
    liked=!liked
    console.log({updatedData})
    // Update local state or revalidate cached data here (if applicable)

    revalidateTag("posts"); // Revalidate cache tag
  } catch (error) {
    console.error("Error liking post:", error); // Handle errors gracefully
  }
};



const LikeContainer =async ({userId,postId,likes,comment_id}:Likes) => {

    
   const liked:boolean=await CheckPostLike(likes,userId);

  const updateLike=handleSubmitLike.bind( null,liked, userId, postId)



  return (
    <form action={updateLike} >
    {
        !liked?
        <button className="flex items-start justify-center" type="submit">
          <CiHeart   size={comment_id?25:20}   className="cursor-pointer hover:text-[#adadad]" />
        </button>
        :
        <button className="flex items-start justify-center" type="submit">
                 <FaHeart   size={comment_id?25:20}  className="cursor-pointer text-red-600" />

        </button>
    }
    </form>
    
  )
}

export default LikeContainer