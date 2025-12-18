"use client"
import { AutoComplete, Input, SelectProps } from 'antd';
import Image from 'next/image'
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaCreativeCommonsShare } from "react-icons/fa6";
import ApiConfig from '../ApiConfig';
import Link from 'next/link';
interface User
{
  _id: string,
  email: string,
  fullName: string,
  username: string
}



const Navbar = () => {

    const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

    const searchResult =  async (query: string) =>{
        try {
            const result=await fetch(`${ApiConfig.SearchUser}?username=${query}`,{
              method:"GET",
              headers:{
                "Content-Type":"Application/json"
              }
            });
    
            if(result.ok){
              const data=await result.json();
            
            const res=data.users.map((user:User) => {
                  
                  return {
                      value: user.username,
                      label: (
                          <a
                            href={`/${user.username}`}
                            rel="noopener noreferrer"
                              style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                              }}
                          >
                              <span>
                                  
                                  <div
                                      
                                      className='w-full flex items-center gap-3'

                                  >
                                        <div className="border-[#C13584] rounded-full  border-[2px] p-[1px] flex items-center justify-center 
                                w-12 h-12
                               ">
                                    <img src="/picture.jpg" className='w-full h-full rounded-full object-cover  cursor-pointer  ' alt="" />
                                </div>

                                      {user.username}
                                  </div>
                              </span>
                             
                          </a>
                      ),
                  };
              });
               
            setOptions(res);
            }
        } catch (error) {
            console.log({error});
        }

       
        }
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const handleSearch =async (value: string) => {
        const result=await searchResult(value);
        
    };

    const onSelect = (value: string) => {
        console.log('onSelect', value);
    };

    return (
        <div className='w-full iniline md:hidden z-[10] px-3 py-2 fixed top-0 border-b-[1px] border-gray-400 bg-white shadow-lg'>
            <div className="flex w-full px-5  items-center justify-between">
                <div className="flex-[0.4]">
                    <Link href="/" className={`w-[80px] h-[40px] flex items-center  relative`}>
                        <Image src="/snaply-mob.png" className={`object-contain   cursor-pointer `} alt="" fill />
                    </Link>
                </div>
                <AutoComplete
                    popupMatchSelectWidth={true}
                    style={{ width: 300 }}
                    options={options}
                    onSelect={onSelect}
                    onSearch={(value:string)=>searchResult(value)}
                    size="large"
                    className='flex-[0.6] '
                >
                    <Input.Search size="large" placeholder="input here" enterButton  />
                </AutoComplete>


            </div>
        </div>
    )
}

export default Navbar