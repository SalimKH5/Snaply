"use client"


import Following from './Following'
import Link from 'next/link'
import { IoPersonAddOutline } from 'react-icons/io5'
import { HiDotsHorizontal } from 'react-icons/hi'
import BodyContent from './BodyContent'
import { useToggleState } from './SearchToggle'
import { useCallback, useEffect, useState } from 'react'
import ToggleStory from './ToggleStory'


interface StoryType {
    img: string
}

const ProfileContent = ({ user, session, username, posts }: { user: User, session: any, username: string, posts: Post[] }) => {

    const { toggle, setToggle, searchToggle } = useToggleState();



    // Function to handle clicks outside of the component
    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (searchToggle.current && !searchToggle.current.contains(event.target as Node)) {
                setToggle(false); // Call onClose function when clicked outside
            }
        },
        [toggle]
    );

    // Add event listener when the component mounts
    useEffect(() => {
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    const [toggleStory, setToggleStory] = useState<boolean>(false)
    const [storyIndex, setStoryIndex] = useState<number>(0);

    const stories: StoryType[] = [
        {
            img: "/picture.jpg",

        },
    ]

    const handleToggleStory = () => {
      
        setToggleStory((prev: boolean) => true)
    }

   
    return (
        <div className="w-full h-full md:ml-[13%] lg:ml-[25%] px-2 flex-grow flex items-center justify-center py-8  lg:max-w-4xl mx-auto flex-col ">
            {toggleStory && <ToggleStory setStoryIndex={setStoryIndex} toggleStory={toggleStory} setToggleStory={setToggleStory} storyIndex={storyIndex} stories={stories} />}
            <div className='w-full h-full  md:py-10 flex flex-col gap-2 sm:gap-5 lg:gap-16  mx-auto'>
                <div className="w-full flex md:items-center md:justify-between max-w-xl lg:max-w-2xl gap-4 lg:gap-8">
                    <div className="md:flex-[0.4] flex items-center justify-center ">
                        <div
                            onClick={() => handleToggleStory()}
                            className="border-[#C13584] rounded-full  border-[2px] p-[1px] flex items-center justify-center 
                                md:w-20 md:h-20
                                w-14 h-14
                                lg:w-36 lg:h-36  ">
                            <img src="/picture.jpg" className='w-full h-full rounded-full object-cover  cursor-pointer  ' alt="" />
                        </div>
                    </div>
                    <div className="md:flex-[0.6] h-full flex flex-col gap-4 lg:gap-8">
                        <div className=" flex flex-col md:flex-row md:items-center justify-between gap-3 lg:gap-3 ">
                            <h1 className='pr-5 text-sm'>{user?.username}</h1>
                            {
                                user.username === session?.user.username ?
                                    <div className='flex items-center flex-row gap-2 lg:gap-3'>
                                        <Link href={`/${user.username}/Edite`} className='bg-gray-300 text-[8px] lg:text-sm hover:bg-gray-500 py-1 px-2 rounded-md'>Edite</Link>
                                        <button className='bg-gray-300 text-[8px] box-border  lg:text-sm hover:bg-gray-500 py-1 px-2 rounded-md'>view archive</button>

                                    </div>
                                    :
                                    <div className='flex items-center flex-row gap-2 lg:gap-3'>
                                        <Following
                                            FollowingUser={user._id}

                                            userId={session.user._id}
                                        />
                                        <button className='bg-gray-300  hover:bg-gray-500 py-1 px-5 rounded-md'>Message</button>

                                    </div>
                            }
                            <button className='bg-gray-300 hidden lg:flex  hover:bg-gray-500 py-2 px-2 rounded-md'>
                                <IoPersonAddOutline size={15} />
                            </button>
                            <HiDotsHorizontal size="" className="cursor-pointer hidden lg:flex " />
                        </div>
                        <div className="w-full  items-center  gap-5 hidden md:flex">
                            <h1><span className="font-bold">{user?.postsLength}</span> posts</h1>
                            <h1><span className="font-bold">{user?.followers?.length}</span> followers</h1>
                            <h1><span className="font-bold">{user?.follwing?.length}</span> following</h1>
                        </div>
                        <div className="w-full flex items-start">
                            <h1 className="font-bold">{user?.fullName}</h1>
                        </div>
                    </div>

                </div>
                <div className="w-full  items-center justify-center flex md:hidden  border-t-[1.5px] border-gray-400 px-4 sm:px-5">

                    <div className="w-full  items-center justify-between gap-5 py-1  md:gap-10 flex">
                        <div className="flex items-center flex-col gap-1">
                            <span className="font-bold text-sm" >{user?.postsLength}</span>
                            <h1 className='text-sm text-gray-600'>posts</h1>
                        </div>
                        <div className="flex items-center flex-col gap-1">
                            <span className="font-bold text-sm" >{user?.followers?.length}</span>
                            <h1 className='text-sm text-gray-600'>followers</h1>
                        </div>
                        <div className="flex items-center flex-col gap-1">
                            <span className="font-bold text-sm" >{user?.follwing?.length}</span>
                            <h1 className='text-sm text-gray-600'>following</h1>
                        </div>
                    </div>
                </div>

                <BodyContent username={username} posts={posts} session={session} />

            </div>
        </div>
    )
}

export default ProfileContent