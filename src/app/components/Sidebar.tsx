"use client"
import Image from 'next/image'
import { IoHome } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { RxVideo } from "react-icons/rx";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { MdOutlineExplore } from "react-icons/md";
import { signOut } from "next-auth/react"
import { ChangeEvent, useState } from 'react';
import { Modal, Spin } from 'antd';
import { FaPhotoVideo } from "react-icons/fa";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import { revalidateTag } from 'next/cache';
import { useRouter } from 'next/navigation';
import { CiPower } from "react-icons/ci";
import Link from 'next/link';
import SingupContent from './SingupContent';
import Api from '../ApiConfig';
import SearchContainer from './SearchContainer';
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



const Sidebar = ({ token }: { token: string | undefined }) => {

  const naigations_Items: ItemNavigation[] = [
    {
      text: "Home",
      icon: <IoHome width={150} />,
      path: "/Home",
      type: 0,
    },
    {
      text: "Search",
      icon: <CiSearch width={150} />,
      path: "/Search",
      type: 2,
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

  const [searchToggle, setSearchToggle] = useState<boolean>(false);
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
        const result = await fetch(Api.posts, {
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



  return (
    <div className="w-full z-50 h-full flex items-center">
       <div className={` ${searchToggle ?"w-32":"w-full"} h-full flex overflow-y-auto border-[1px] relative hide-scroll-bar items-center lg:items-center flex-col gap-8 px-4 py-4`}>
      <Link href="/" className="w-full px-4 min-h-[80px] flex items-center">
        <div className={`${searchToggle ? "w-[30px] h-[30px] px-2 " : " w-[30px] h-[30px] lg:w-[120px] lg:h-[80px]"} flex  relative`}>
          <Image src="/instagram-logo-1-1024x366.svg" className={`${searchToggle ? "hidden" : " hidden lg:inline"} cursor-pointer `} alt="" fill />
          <Image src="/instagram-logo.png" className={`${searchToggle ? "inline" : "inline lg:hidden"} hover:bg-[#e7e7e7] rounded-lg  p-[3px]  `} alt="" fill />
        </div>
      </Link>
      <div className="w-full flex flex-col gap-4 px-2">
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
                if(item.type===2){
                  setSearchToggle((prev:boolean)=>!prev)
                }
              }
              }
              key={index} className="w-full flex text-2xl items-center gap-3 px-2 rounded-xl cursor-pointer py-2 
                            hover:scale-105
                            hover:bg-[#e7e7e7]">
              {item.icon}
              <h1 className={`${searchToggle ? "hidden" : "hidden lg:inline"} text-base `}>{item.text}</h1>

            </div>
          ))
        }
      </div>
      <Modal open={isModalOpen} onOk={handleOk} footer={null} onCancel={handleCancel}  >
        <div className="w-full min-h-72 flex items-center flex-col justify-center cursor-pointer">
          {formData.filePath ?
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <ReactCrop crop={crop} onChange={(crop, percentCrop) => setCrop(crop)} >
                <img src={imageDipslay} alt="Selected" className='object-contain' style={{ maxWidth: '100%' }} />
              </ReactCrop>
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
              <FaPhotoVideo size={130} />
              <input type="file" accept="image/*" onChange={handleFileSelect} />
            </>

          }
        </div>
      </Modal>
      </div>  
      {
        searchToggle &&  <SearchContainer/>   
      }
     
    </div>

    
  )
}

export default Sidebar