import Image from 'next/image'

const PostPicture = () => {
  return (
    <div className='w-full h-[26rem] relative'>
            <Image src="/picture.jpg" alt="" fill objectFit='contain' />
    </div>
  )
}

export default PostPicture