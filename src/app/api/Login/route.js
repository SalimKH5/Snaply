import Users from "@/models/users";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/lib/mongodb";
export async function POST(request){
    const {email,password}=  await request.json();
      try {

        await connectMongoDB();

        const user= await Users.findOne({ email});
        
        if(!user){
                return NextResponse.json({message:"Error"},{status:401})
        }else{
            user.comparePassword(password, function (matchError,isMatch){
                if(matchError){
                        return NextResponse.json({message:"Incorrect email or password"},{status:401})
                }else if(!isMatch){
                    return NextResponse.json({message:"Incorrect email or password"},{status:402})
                }else{
                    return NextResponse.json({user},{status:200})
                }
            })
        }
   
    } catch (error) {
        return NextResponse.json({message:"Error",error:error}.error,{status:500})
        
    }      
 
    
  }