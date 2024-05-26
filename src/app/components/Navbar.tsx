"use client"
import { AutoComplete, Input, SelectProps } from 'antd';
import Image from 'next/image'
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaCreativeCommonsShare } from "react-icons/fa6";
const Navbar = () => {

    const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

    const searchResult = (query: string) =>
        new Array(getRandomInt(5))
            .join('.')
            .split('.')
            .map((_, idx) => {
                const category = `${query}${idx}`;
                return {
                    value: category,
                    label: (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>
                                Found {query} on{' '}
                                <a
                                    href={`https://s.taobao.com/search?q=${query}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {category}
                                </a>
                            </span>
                            <span>{getRandomInt(200, 100)} results</span>
                        </div>
                    ),
                };
            });
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value: string) => {
        console.log('onSelect', value);
    };

    return (
        <div className='w-full iniline md:hidden z-[99] px-3 py-2 fixed top-0 border-b-[1px] border-gray-400 bg-white shadow-lg'>
            <div className="flex w-full px-5  items-center justify-between">
                <div className="flex-[0.4]">
                    <div className={`w-[80px] h-[40px] flex items-center  relative`}>
                        <Image src="/instagram-logo-1-1024x366.svg" className={`object-contain   cursor-pointer `} alt="" fill />
                    </div>
                </div>
                <AutoComplete
                    popupMatchSelectWidth={true}
                    style={{ width: 300 }}
                    options={options}
                    onSelect={onSelect}
                    onSearch={handleSearch}
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