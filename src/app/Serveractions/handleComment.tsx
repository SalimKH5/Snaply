"use server"

import { revalidateTag } from "next/cache";
import Api from '../ApiConfig';
export const handleSubmitLike = async (userId: string, postId: string,e:FormData,) => {
    'use server'
    console.log("hello comment")
    const TextComment=e.get('TextComment');
    if(TextComment!=""){
        try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}/commentPost`, {
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
      }else{
           
      const updatedData = await response.json(); // Handle success response if needed
      console.log({updatedData});
      e.set('TextComment'," ")
      // Update local state or revalidate cached data here (if applicable)
  
      revalidateTag("posts"); // Revalidate cache tag
      }
  
    } catch (error) {
      console.error("Error liking post:", error); // Handle errors gracefully
    }
    }
    
  };


export const handleFollow = async (userId: string, FollowingUser: string, isFollow: boolean,e: React.MouseEvent<HTMLButtonElement>) => {
  try {
      e.preventDefault();
      const response = await fetch(`${Api.User+userId}/following`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
                  userId: FollowingUser,
                  following: !isFollow
          }),
      });

      if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
      } else {

          const data = await response.json();
          revalidateTag("user"); // Revalidate cache tag
          return data.user;
          // Update local state or revalidate cached data here (if applicable)

         
      }

  } catch (error) {
      console.error("Error liking post:", error); // Handle errors gracefully
  }
}
    



export default async function actionGetUser() {
  revalidateTag("users");
}