"use client"
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const LikesModel = ({likes}:{likes:any[]}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
   
  return (
    <>
                <p onClick={showModal} className="font-bold cursor-pointer">{likes.length} Likes</p>

      <Modal title="Basic Modal"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <div className='w-full h-auto flex flex-col gap-3'>
            {likes.map((like:any,index:number)=>(
                <div key={index} className='w-full flex items-center justify-between'>
                        <p className='font-bold text-lg capitalize'>{like.userId.username}</p>
                        <Button  className="bg-blue-500 text-white hover:bg-white hover:text-blue-500">Follow</Button>
                </div>
            ))}                                
       </div>
       
      </Modal>
    </>
  )
}

export default LikesModel