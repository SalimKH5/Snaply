import Image from 'next/image'

const PostPicture = ({src}:{src:string}) => {
  return (
    <div className='w-full h-full min-h-[30rem] relative  '>
            <Image src={`/assets/${src}`} 
            alt={src} priority  fill 
            
            className="object-cover   w-full absolute left-0 right-0 h-full rounded-lg"/>
    </div>
  )
}

export default PostPicture