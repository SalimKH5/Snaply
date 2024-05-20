import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";

import { decrypt } from "@/app/lib/Autherisation";
import jwt from "jsonwebtoken"
import dbConnect from "@/app/lib/mongodb";
const UserModel =require("@/app/lib/model/User");
import PostModel from "@/app/lib/model/Post";


export const POST = async (req: NextRequest) => {
  try {
      const authHeader = req.headers.get('authorization');
      const token = authHeader?.split("Bearer ")[1];
      if (!authHeader || !token) {
          return NextResponse.json({ error: "Token not found" }, { status: 401 });
      }

      const decode = jwt.verify(token, "your-secret-key") as jwt.JwtPayload;
      if (!decode?.user?._id) {
          return NextResponse.json({ error: "Not authorized" }, { status: 401 });
      }

      const formData = await req.formData();
      const file = formData.get("file") as File;
      const postTitle = formData.get("postTitle") as string;
      if (!file || !postTitle) {
          return NextResponse.json({ error: "No files received or post title missing." }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = Date.now() + "-" + file.name;
      const filePath = join(__dirname, '..', 'media_files', filename);

      await writeFile(filePath, buffer);

      const Post = PostModel;
      const post = await Post.create({
          PathFile: filename,
          title: postTitle,
          likes: [],
          comments: [],
          created: Date.now().toString(),
          postby: decode.user._id
      });

      return NextResponse.json({ message: "Successfully uploaded a post", post }, { status: 200 });
  } catch (error) {
      console.log("Error occurred ", error);
      return NextResponse.json({ message: "Failed to upload post", error }, { status: 500 });
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

    
      
      const posts = await PostModel.find().populate('postby',"_id username").populate('comments.userId',"_id username").populate('likes.userId',"_id username").sort({ created: -1 }); // Sort by createdAt field in descending order;

      return NextResponse.json({ Message: "successfully upload a post",posts }, { status: 200 });
      }

      
      
    } catch (error) {
      console.log("Error occurred ", error);
      return NextResponse.json({ Message: "Failed", error:error },{status: 500});
    }
};

