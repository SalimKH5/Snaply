import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";

import { decrypt } from "@/app/lib/Autherisation";
import jwt from "jsonwebtoken"
import prisma from "../../../../prisma";
export const POST = async (req: NextRequest,) => {
 
  try {
    const auth_header =  req.headers.get('authorization');
    const token : string|undefined=auth_header?.split("Bearer ")[1];
    if (!auth_header && !token)
      {
      return NextResponse.json({error: "token not found"},{status:401});

      }

      const decode:string | jwt.JwtPayload|null|undefined =decrypt(token);
      
      
    
      if(!decode || typeof(decode)=="string"){
        return NextResponse.json({error: "not authorized"},{status:401});
      }

      
    const formData = await req.formData();
        
        const file: File | null = formData.get("file") as unknown as File; // Type assertion to File or null
        const postTitle:string= formData.get("postTitle") as unknown as string; // Type assertion to File or null
        if (!file || !postTitle) {
          return NextResponse.json({ error: "No files received." }, { status: 400 });
        }
        
       console.log(postTitle)
      
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const path=join(process.cwd(),'src/app/api/uploads',file.name);
        const post=await prisma.post.create({
          data:{filePath:path,postTitle,userId:decode?.user?.id}
        })

        await writeFile(path,buffer);



      return NextResponse.json({ Message: "successfully upload a post", post },{status: 200});

    } catch (error) {
      console.log("Error occurred ", error);
      return NextResponse.json({ Message: "Failed", error:error },{status: 500});
    }
};









