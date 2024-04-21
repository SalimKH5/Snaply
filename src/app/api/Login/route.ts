import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "../../../../prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const POST=async (req:Request)=>{
   
    try{
        const {email,password}=await req.json();
       
           
        if(!email || !email){
            return NextResponse.json({message:"Invalid Data"},{status:422})
        }
        await connectToDatabase();
        const user= await prisma.user.findFirst({
            where: {AND: [{email}]}
          });
      
          if (user && user?.hashpassword) {
            // Compare hashed passwords securely
            const passwordMatches = await bcrypt.compare(password, user?.hashpassword); // Use correct property name
            if (!passwordMatches) {
              return NextResponse.json({ message: "Invalid password" }, { status: 401 }); // Use 401 for Unauthorized
            }else{
                const payload = {
                    user
                };
                            // Secret key for signing (store securely in environment variables)
                const secret:string|undefined = process.env.JWT_SECRET;

                try {
                    if(secret){
                        const token =  jwt.sign(payload, secret, { expiresIn: '1h' }); // Set expiration time

                        console.log('hello wolrd')
                        return NextResponse.json({ message: "connected succesfully",user:{
                            ...user,
                            token:token
                        } }, { status: 220 }); // Use 401 for Unauthorized
        
                    }
                    
                } catch (error) {
                    console.error(error);
                    return NextResponse.json({ message: "error token"}, { status: 402 }); // Use 401 for Unauthorized
                }
                
            }
        }else{
        
            return NextResponse.json({message:"User not found it"},{status:422})
        }

    }catch(error){
            console.log(error);
            return NextResponse.json({message:"server Error",error},{status:500})
            
    }finally{
        await prisma.$disconnect();
    }
}
