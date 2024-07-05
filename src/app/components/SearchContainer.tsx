"use client"
import { Input } from 'antd'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Api from "../ApiConfig"
import Link from 'next/link'
import { useToggleState } from './SearchToggle'
import { FaLaptopHouse } from 'react-icons/fa'

interface User {
  _id: string,
  email: string,
  fullName: string,
  username: string
}

const SearchContainer = () => {



  const [username, setUsername] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (value === "") {
      setUsers([]);
      setLoading(false);
    } else {
      setLoading(true);
      searchTimeout.current = setTimeout(async () => {
        try {
          const result = await fetch(`${Api.SearchUser}?username=${value}`, {
            method: "GET",
            headers: {
              "Content-Type": "Application/json"
            }
          });

          if (result.ok) {
            const data = await result.json();
            console.log({ data });
            setUsers(data.users);
          }
        } catch (error) {
          console.log({ error });
        } finally {
          setLoading(false);
        }
      }, 100000); // 500 milliseconds debounce time
    }
  };

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);



  console.log({ users });
  const { toggle, setToggle } = useToggleState();




  return (
    <div className='fixed left-[4.5rem] border-l-[2px]   z-[99999] h-full shadow-xl w-72 md:w-96  bg-white'>
      <div className="w-full h-full py-3 px-2 flex flex-col gap-5">
        <h1>Search</h1>
        <Input
          value={username}
          onChange={handleSearch}
          className='bg-gray-100 text-lg' allowClear placeholder='Search' />
        <div className="w-full py-2 flex flex-col gap-3 border-t-[1px]">
          {
            loading ?
              <div className='w-full flex flex-col gap-3'>
                <div className="w-full flex items-center gap-5">
                  <div className='w-12 h-12 rounded-full bg-slate-400 animate-pulse '>

                  </div>
                  <div className='w-full pr-5 flex flex-col gap-2'>
                    <div className='w-full h-2 bg-slate-400 animate-pulse rounded-md  py-2'>

                    </div>
                    <div className='w-full h-2 bg-slate-400 animate-pulse rounded-md  py-2'>

                    </div>
                  </div>

                </div>



              </div>
              :
              users.length > 0 ?

                users.map((user: User, index: number) => (
                  <Link
                    key={index}
                    onClick={() => {
                      setToggle(false);
                    }}
                    href={`/${user.username}`} className="w-full hover:bg-slate-400 py-1 px-2 rounded-xl hover:text-white flex items-center">
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
                  </Link>
                ))
                :
                <h1>Recents</h1>
          }

        </div>

      </div>
    </div>
  )
}

export default SearchContainer