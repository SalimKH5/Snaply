import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
      user:{
      email:string,
      _id:string, 
      fullName:string
      token:string,
      saveposts:any[]
      username:string
      followers:any[]
      follwing:any[]
      }
    }
  
    interface User {
      email:string,
      _id:string, 
      fullName:string,
      token:string,
      saveposts:any[]
      username:string
      followers:any[]
      follwing:any[]

    }

}
declare module "next-auth/jwt" {
  interface JWT {
    email:string,
    _id:string, 
    fullName:string,
    token:string,
    saveposts:any[]
    username:string
    followers:any[]
    follwing:any[]

  }
  interface User {
    
    email:string,
    _id:string, 
    fullName:string,
    token:string,
    saveposts:any[]
    username:string
    followers:any[]
    follwing:any[]


  }

 
}