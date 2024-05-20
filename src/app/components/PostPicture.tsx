import Image from 'next/image'
import api from "../ApiConfig"
const PostPicture = ({src}:{src:string}) => {
  return (
    <div className='w-full h-full min-h-[30rem] relative  '>
            <Image src={src} 
            alt={src} priority  fill 
            unoptimized
            className="object-cover   w-full absolute left-0 right-0 h-full rounded-lg"/>
    </div>
  )
}

export default PostPicture