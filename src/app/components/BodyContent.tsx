
import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { LiaTableSolid } from 'react-icons/lia'
import TogglePost from './TogglePost'

import dynamic from "next/dynamic";


const LazyComponent = dynamic(() => import('./ImageHover'), {
    loading: () => 
    <div className='bg-slate-300 rounded-lg animate-pulse w-full h-full '>
  
    </div>, // Optional loading component
    ssr: false, // Disable server-side rendering for this component
  });




const BodyContent =  ({username,posts,session}:{username:string,posts: Post[],session:any}) => {

   

 
    
  return (
    <div className="w-full pb-16 lg:py-16 md:py-2">
                            <hr />
                            <div className="w-full flex items-center justify-center gap-10">
                                <button className='border-t-[1px] py-3 px-5 border-black flex items-center gap-1'>
                                    <LiaTableSolid />
                                    <h1>Posts</h1>
                                </button>
                                <button

                                    className='border-t-[1px] py-3 px-5 border-black  flex items-center gap-1'>
                                    <BsFillPersonFill />
                                    <h1>TAGGED</h1>
                                </button>

                            </div>

                            <div className="w-full h-auto grid grid-cols-3 gap-[3px] ">
                                {
                                    posts.map((post: Post,index:number) => (
                                        <div 
                                        key={index}
                                        className='w-full  relative h-32 lg:h-60 cursor-pointer '>
                                            <TogglePost
                                                likes={post.likes}        
                                                toggle={<LazyComponent likes={post.likes}  comments={post.comments} PathFile={post.PathFile}  />}
                                                src={post.PathFile}
                                                comments={post.comments}
                                                postby={post.postby}
                                                title={post.title}
                                                userId={session.user._id}
                                                postId={post._id}
                                            />

                                        </div>
                                    ))
                                }


                            </div>


                        </div>
  )


}

export default BodyContent