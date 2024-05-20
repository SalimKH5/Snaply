
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "../ApiConfig"
type User={
    email:string,
    password:string
}

export const authOptions:NextAuthOptions  = {
    session: {
        strategy: 'jwt',
      },


providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        const {email,password} = credentials as User;
        console.log({url:api.login_client});
        const result=await fetch(api.login_client,{
            method:"POST",
            headers:{
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        })
        if(result.ok){
            const data=await result.json();
        console.log({data});

         
            return data?.user;
        }else{
            return null;
        }
        
    },

  })
],
pages:{
    signIn:"/account/Login",
    signOut: "/account/Login",
    
  },
  callbacks: {
    async jwt({ token, account,user,trigger,session }) {
      // Persist the OAuth access_token to the token right after signin
    
      if (account) {
        console.log({token})
        token._id=user._id
        token.fullName=user.fullName
        token.email=user.email
        token.token=user.token
        token.saveposts=user.saveposts
        token.username=user.username
        token.followers=user.followers
        token.follwing=user.follwing
        token.gender=user.gender
        token.bio=user.bio
        token.thumbnail=user.thumbnail
      
      }
      if(trigger==="update"){
        return {...token,...session?.user}
      }
     
      return token
    },
    async session({ session,token , trigger, newSession }) {
       session.user=token
      return session
    },
    
  },

}
