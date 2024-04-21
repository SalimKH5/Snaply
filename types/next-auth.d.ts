import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
      user:{
      email:string,
      id:string, 
      fullName:string
      token:string,
      }
    }
  
    interface User {
      email:string,
      id:string, 
      fullName:string,
      token:string,
    }

}
declare module "next-auth/jwt" {
  interface JWT {
    email:string,
    id:string, 
    fullName:string,
    token:string,
  }
  interface User {
    
    email:string,
    id:string, 
    fullName:string,
    token:string,

  }

 
}