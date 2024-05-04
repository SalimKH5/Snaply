
import { HiDotsHorizontal } from "react-icons/hi";








const PostHeader = ({username}:{username:String}) => {
  return (
    <div className='w-full flex items-center justify-between px-1 py-1'>
        <div className="flex items-center gap-2">
                    <div className="border-[#C13584] rounded-full  border-[2px] p-[1px] flex items-center justify-center w-8 h-8  ">
                            <img src="/picture.jpg"  className='w-full h-full rounded-full object-cover  cursor-pointer  '  alt=""/>
                    </div>
                    <div className="flex flex-col ">
                        <h1 className='text-sm font-bold'>{username}</h1>
                      
                    </div>
        </div> 
        <div className="">
            <HiDotsHorizontal size="" className="cursor-pointer"/>
        </div>
        

    </div>
  )
}

export default PostHeader