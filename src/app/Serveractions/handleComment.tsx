
"use server"
import { revalidateTag } from "next/cache";
import Api from '../ApiConfig';
import { Dispatch, FormEvent, FormEventHandler, SetStateAction } from "react";
export const handleSubmitComment = async (userId: string, postId: string,e:FormData,) => {
  'use server'
  
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


export const handleSubmitLike = async (liked: boolean, userId: string, postId: string): Promise<boolean | void> => {
 
  try {

    const response = await fetch(`${Api.posts+postId}/likePost`, {
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
    
  
  
    // Update local state or revalidate cached data here (if applicable)
    revalidateTag("posts"); // Revalidate cache tag

    return !liked;
  
  } catch (error) {
    console.error("Error liking post:", error); // Handle errors gracefully
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