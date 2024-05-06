

import { IoShareSocialOutline } from "react-icons/io5";

import LikeContainer from "./LikeContainer";
import LikesModel from "./LikesModel";
import TogglePost from "./TogglePost";
import SavePost from "./SavePost";
import { FaRegComment } from "react-icons/fa";


interface PostContent{
    postId: string,
    likes:any[],
    title:string,
    comments:any[],
    src:string,
    postby:{
        _id: string,
        username: string,
    },
      userId:string,
}
  

const PostContent = ({postId,comments,src,title,likes,postby,userId}:PostContent) => {
    return (
        <div className="w-full flex flex-col gap-3">
            
            <div className="w-full flex items-center justify-between">
                <div className="flex gap-3 items-center font-bold ">
                    <LikeContainer likes={likes} userId={userId} postId={postId} comment_id={null}/>
                    <TogglePost
                        toggle={ <FaRegComment  size={25} className="cursor-pointer hover:text-[#adadad]" />}
                        src={src}
                        comments={comments}
                        postby={postby}
                        title={title}
                        userId={userId}
                        postId={postId}
                        />
                    <IoShareSocialOutline size={25} className="cursor-pointer hover:text-[#adadad]" />
                 
                </div>
                <div className="">
                    <SavePost userId={userId} postId={postId}/>
                </div>
            </div>
            <LikesModel likes={likes}/>
            <div className="w-full flex  gap-3 py-2">
                <div className="">
                    <h1 className="font-bold cursor-pointer">{postby.username}</h1>
                </div>
                <div className="flex-1">
                        <h1>{title}</h1>
                </div>
            </div>
        </div>

    )
}

export default PostContent