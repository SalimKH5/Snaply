import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";

import { decrypt } from "@/app/lib/Autherisation";
import jwt from "jsonwebtoken"
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/lib/model/User";
const UserModel =require("@/app/lib/model/User");
import PostModel from "@/app/lib/model/Post";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

import multer from "multer";
import {storage} from "../../lib/firebase"
import { initializeApp } from "firebase/app";







const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
}



export const POST = async (req: NextRequest,) => {
 
  try {
    const auth_header =  req.headers.get('authorization');
    const token : string|undefined=auth_header?.split("Bearer ")[1];
    if (!auth_header && !token)
      {
      return NextResponse.json({error: "token not found"},{status:401});

      }

      const decode:string | jwt.JwtPayload|null|undefined =decrypt(token);
      
      dbConnect();
    
      if(!decode || typeof(decode)=="string"){
        return NextResponse.json({error: "not authorized"},{status:401});
      }


    const formData = await req.formData();
        
        const file: File | null = formData.get("file") as unknown as File; // Type assertion to File or null

        const postTitle:string= formData.get("postTitle") as unknown as string; // Type assertion to File or null
        if (!file || !postTitle) {
          return NextResponse.json({ error: "No files received." }, { status: 400 });
        }
         
       dbConnect();
        const bytes = await file.arrayBuffer();
        const dateTime = giveCurrentDateTime();

        
        
        // Initialize Cloud Storage and get a reference to the service
       
        const storageRef = ref(storage, `images/${file.name + "       " + dateTime}`);
         // Create file metadata including the content type
     // Upload the file in the bucket storage
    


       const snapshot = await uploadBytes(storageRef, file)
        
       const downloadURL = await getDownloadURL(snapshot.ref);
       

          if(downloadURL){
            const Post = PostModel;
            const post= await Post.create({
                PathFile: downloadURL,
                title: postTitle,
                likes: [],
                comments: [],
                created:Date.now().toString(),
                postby:decode?.user?._id
              });
    
    
            await post?.save();
           
    
          return NextResponse.json({ Message: "successfully upload a post",posts:post},{status: 200});
    
          }
         
        
        
    } catch (error) {
      console.log("Error occurred ", error);
      return NextResponse.json({ Message: "Failed", error:error },{status: 500});
    }
};

export const GET = async (req: NextRequest,) => {
 
  try {
    const auth_header =  req.headers.get('authorization');
    const token : string|undefined=auth_header?.split("Bearer ")[1];
    if (!auth_header && !token)
      {
      return NextResponse.json({error: "token not found"},{status:401});

      }else{
        const decode:string | jwt.JwtPayload|null|undefined =decrypt(token);
      
      await dbConnect();
    
      if(!decode || typeof(decode)=="string"){
        return NextResponse.json({error: "not authorized"},{status:401});
      }
      
     const user = await User.findById(decode?.user?._id).populate('follwing.userId').exec();
      if (!user) {
        throw new Error('User not found');
      }

      const followedUserIds = user.follwing.map((follow:any) => follow?.userId?._id);
     
      
      
      const posts = await PostModel.find({ postby: { $in: followedUserIds } }).populate('postby',"_id username").populate('comments.userId',"_id username").populate('likes.userId',"_id username").sort({ created: -1 }); // Sort by createdAt field in descending order;

      return NextResponse.json({ Message: "successfully upload a post",posts,followedUserIds }, { status: 200 });
      }

      
      
    } catch (error) {
      console.log("Error occurred ", error);
      return NextResponse.json({ Message: "Failed", error:error },{status: 500});
    }
};

