import connectMongoDB from "@/app/lib/mongodb";
import Users from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password,username } = await request.json();
  try {
    await connectMongoDB();
   const user= await Users.create({ email, password,username });
   if(!user){
    return NextResponse.json({message:"Error"},{status:401})
   }
   return NextResponse.json({ message: "User Created",user:user }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Error while creating",error:error }, { status: 500 });
  }
 
}

export async function GET() {
  await connectMongoDB();
  const users = await Users.find();
  return NextResponse.json({ users });
}

