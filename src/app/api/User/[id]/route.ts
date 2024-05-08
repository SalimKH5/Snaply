import { NextRequest, NextResponse } from "next/server";
const UserModel= require("@/app/lib/model/User");
import User from "@/app/lib/model/User";
import Post from "@/app/lib/model/Post";
const  PostModel=require("@/app/lib/model/Post");
export const PUT=async(req:NextRequest,context:any)=>{

    try {
        const {postId,savePost}=await req.json();
        const {params}=context;

        console.log({postId})
        console.log({params})
        if(savePost){
            const user = await User.findOneAndUpdate(
                { _id: params.id, },
                    {
                        $addToSet: {
                            saveposts: { "postId": postId }, // Remove like based on userId
                        }
                    },
                { new: true }
            ).populate('saveposts.postId');

            console.log({user});
            return NextResponse.json({ Message: "success save post",user},{status: 200});
    
          
        }else{
            
            const user = await User.findOneAndUpdate(
                { _id: params.id, },
                    {
                        $pull: {
                            saveposts: { "postId": postId }, // Remove like based on userId
                        }
                    },
                { new: true }
            ).populate('saveposts.postId');
            
            return NextResponse.json({ Message: "success removing asave post",user},{status: 200});
    

        
    
          
        }
      
        
    } catch (error:any) {
        return NextResponse.json({ Message: "error saving a post",error},{status: 500});
    }
};
export const GET=async(req:NextRequest,context:any)=>{

    try {
        
        const {params}=context;

        const userPost = await User.aggregate([
            {
                $match: {
                    username: { $regex: new RegExp('^' + params.id + '$', 'i') }
                }
            },
            {
                $lookup: {
                    from: 'posts', // The name of the collection to join with
                    localField: '_id', // Field in the User model
                    foreignField: 'postby', // Field in the Post model
                    as: 'posts' // Output array field
                }
            },
            {
                $addFields: {
                    postCount: { $size: '$posts' } // Count the number of posts
                }
            },
            {
                $project: {
                    posts: 0 // Exclude the posts array from the output
                }
            },
            {
                $limit: 1 // Limit the result to one document
            }
        ]);
        const user=userPost[0]
        if(user){
            return NextResponse.json({ Message: "sucessfully retrive user",user},{status: 200});
        }
      
        return NextResponse.json({ Message: "client error geting user"},{status: 200});
        
    } catch (error) {
        return NextResponse.json({ Message: "server error geting user",error},{status: 500});
    }
};