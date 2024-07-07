"use client"

import { revalidateTag } from 'next/cache'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import { CiPower, CiSearch } from 'react-icons/ci'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { IoHome } from 'react-icons/io5'
import { Modal, Spin } from 'antd';
import ReactCrop, { Crop } from 'react-image-crop'
import { useToggleState } from './SearchToggle'
import { FaPhotoVideo } from 'react-icons/fa'
import ApiConfig from '../ApiConfig'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
type ItemNavigation = {
    text: string,
    icon: any,
    path: string,
    type: number
}



interface UploadPost {
    filePath: File | null,
    postTitle: string
}
const BottmNavigation = ({ token }: { token: string | undefined }) => {

    const naigations_Items: ItemNavigation[] = [
        {
            text: "Home",
            icon: <IoHome width={150} />,
            path: "/Home",
            type: 0,
        },
        
        {
            text: "Create",
            icon: <IoMdAddCircleOutline width={150} />,
            path: "/Create",
            type: 1,
        },
        {
            text: "Disconnect",
            icon: <CiPower width={150} />,
            path: "",
            type: 4,
        },
    ]

    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [crop, setCrop] = useState<Crop>()
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<UploadPost>({
        filePath: null,
        postTitle: ""
    });


    const [imageDipslay, setImageDataDisplay] = useState<string | undefined>();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setFormData({
            filePath: null,
            postTitle: ""
        })
        setImageDataDisplay(undefined);
    };



    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (typeof event.target?.result === 'string') {
                    setImageDataDisplay(event.target.result);
                }
            };
            reader.readAsDataURL(file);
            setFormData((prev: UploadPost) => ({
                ...prev,
                filePath: file
            }))
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (formData.filePath && formData.postTitle) {
                setLoading(true);
                const fd = new FormData();
                fd.append('file', formData.filePath); // Assuming 'logo' is the key for your file
                fd.append('postTitle', formData.postTitle); // Assuming 'logo' is the key for your file
                const result = await fetch(ApiConfig.posts, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`, // Fix typo in 'Authorization'
                    },
                    body: fd
                })

                if (result.ok) {
                    setLoading(false);
                    handleCancel();
                    router.refresh()
                    revalidateTag("posts"); // Revalidate cache tag



                } else {
                    setLoading(false);
                    console.log("bad did't  upload a the file succesfully");

                }
            }
        } catch (error) {
            setLoading(false);
            console.log({ error });
        }


    }
    const { toggle, setToggle } = useToggleState();

  



    return (
        <div className='w-full iniline md:hidden z-[10] border-t-[1px] border-gray-500 p-3 fixed bottom-0 bg-white shadow-lg'>
            <div className="flex w-full px-5  items-center justify-between">
                {

                    naigations_Items.map((item: ItemNavigation, index: number) => (

                        <div
                            onClick={() => {
                                if (item.type === 1) {
                                    showModal();
                                } else if (item.type === 4) {
                                    signOut()
                                }
                                if (item.type === 0) {
                                    router.push('/');
                                    router.refresh();
                                }
                                if (item.type === 2) {
                                    setToggle((prev: boolean) => !prev)
                                }
                            }
                            }
                            key={index} className="flex p-2 item-center justify-center  rounded-xl cursor-pointer py-1 
                  hover:scale-105
                  hover:bg-[#e7e7e7]">
                            {item.icon}
                           
                        </div>
                    ))
                }
            </div>
            <Modal open={isModalOpen} onOk={handleOk} footer={null} onCancel={handleCancel}  >
                <div className="w-full min-h-32 flex items-center flex-col justify-center cursor-pointer">
                    {formData.filePath ?
                        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
                           <div className='w-full h-64 relative'  >
                  {
                    imageDipslay &&  <Image src={imageDipslay} alt="Selected" fill className='object-fill' style={{ maxWidth: '100%' }} />
                  }
                 
                </div>
                            <div className="w-full flex flex-col gap-5">
                                <textarea
                                    value={formData.postTitle}
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                        setFormData((prev: UploadPost) => ({
                                            ...prev,
                                            postTitle: e.target.value,
                                        }))
                                    }
                                    rows={6}
                                    className='w-full p-2'
                                    placeholder='écrivez un poste'
                                ></textarea>

                                <button className='bg-blue-800 text-white'>
                                    {loading ? <Spin /> : "Post"}</button>
                            </div>
                        </form>
                        :
                        <>
                            <FaPhotoVideo size={60} />
                            <input type="file" accept="image/*" onChange={handleFileSelect} />
                        </>

                    }
                </div>
            </Modal>
        </div>
    )
}

export default BottmNavigation