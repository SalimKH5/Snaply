import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import { redirect, useRouter } from "next/navigation";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiDotsHorizontal } from 'react-icons/hi';
import { signOut } from 'next-auth/react';
import BodyContent from '../components/BodyContent';
import Following from '../components/Following';
import api from "../ApiConfig"
import Link from 'next/link';
import ProfileContent from '../components/ProfileContent';






async function getUser(username: string) {
    const getuser = await fetch(api.User+username, {
        method: "GET",
        next: { tags: ['users'] },
        cache: "no-cache"
    })
  
    if (getuser.ok) {
        const result = await getuser.json();
       
        
        return result?.user;
    } else if (getuser.status == 401) {
        signOut()
    }

    return [];

}



async function getPosts(session: any, username: string) {
    const getposts = await fetch(`${api.User+username}/posts`, {
        method: "GET",
        //   headers:{
        //     Authorization: `Bearer ${session?.user?.token}`, // Fix typo in 'Authorization'
        //   },
        next: { tags: ['posts'] },
        cache: "no-cache"
    })
    if (getposts.ok) {
        const result = await getposts.json();
        console.log({posts:result?.posts[0]?.comments});
        console.log({path:`${api.User+username}/posts`})
        return result?.posts;
    } else if (getposts.status == 401) {
        signOut()
    }

    return [];

}









const page = async ({ params }: { params: { username: string } }) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/account/Login')
    }
    if (session) {
       
        const user: User = await getUser(params.username);
        const posts: Post[] = await getPosts(session,params.username);
       if(user){

        return (
            

                <ProfileContent
                session={session}
                user={user}
                username={params.username}
                posts={posts}
                />
         

            )
        }
    }

}

export default page