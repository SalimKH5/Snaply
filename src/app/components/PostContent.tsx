import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsSave } from "react-icons/bs";
import { BsFillSaveFill } from "react-icons/bs";
const PostContent = () => {
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="w-full flex items-center justify-between">
                <div className="flex gap-3 items-center font-bold ">
                    <CiHeart size={25} className="cursor-pointer hover:text-[#adadad]" />
                    <FaRegComment size={25} className="cursor-pointer hover:text-[#adadad]" />
                    <IoShareSocialOutline size={25} className="cursor-pointer hover:text-[#adadad]" />
                </div>
                <div className="">
                    <BsSave size={25} className="cursor-pointer hover:text-[#adadad]" />
                </div>
            </div>
            <div className="w-full flex  gap-3">
                <div className="">
                    <h1 className="font-bold">weathercaughtoncam</h1>
                </div>
                <div className="flex-1">
                        <h1>Follow (us) @weathercaughtoncam for more crazy weather videos! 🌪️😳</h1>
                </div>
            </div>
        </div>

    )
}

export default PostContent