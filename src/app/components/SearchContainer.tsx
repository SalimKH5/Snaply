"use client"
import { Input } from 'antd'
import React, { ChangeEvent, useState } from 'react'
import Api from "../ApiConfig"
const SearchContainer = () => {



  const [username,setUsername]=useState<string>("");

  const handleSearch=async(e: ChangeEvent<HTMLInputElement>)=>{

    setUsername(e.target.value)
    try {
        const result=await fetch(`${Api.SearchUser}?username=${e.target.value}`,{
          method:"GET",
          headers:{
            "Content-Type":"Application/json"
          }
        });

        if(result.ok){
          const data=await result.json();
          console.log({data});
        }
    } catch (error) {
        console.log({error});
    }
  }









  return (
    <div className='fixed left-[4.5rem] border-l-[2px]   z-[99999] h-full shadow-xl w-72 md:w-96  bg-white'>
            <div className="w-full h-full py-3 px-2 flex flex-col gap-5">
                        <h1>Search</h1>
                        <Input 
                        value={username}
                        onChange={handleSearch}
                        className='bg-gray-100 text-lg' allowClear placeholder='Search'/>                       
                        <div className="w-full py-2 border-t-[1px]">
                                <h1>Recents</h1>
                        </div>

            </div>
    </div>
  )
}

export default SearchContainer