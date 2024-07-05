"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { IoLockClosedOutline } from "react-icons/io5";
import { Button, Input, Spin } from 'antd';
import Link from 'next/link';
import ApiConfig from '../ApiConfig';
import { useRouter } from "next/navigation";
const PasswordForget = () => {

    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        try {
            const result = await fetch(ApiConfig.FindUser, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            })

            if (result.ok) {
                const data = await result.json();
                localStorage.setItem('email', email);
                setLoading(false)
                router.push('/account/ResetPassword');

            } else {
                console.log("error");
                setError(true);
                setLoading(false)
            }
        } catch (error) {
            console.log({ error });
            setError(true);
            setLoading(false)
        }
    }
    return (
        <div className="w-full h-full flex items-center justify-center py-6">
            <div className="w-full max-w-sm py-4 border-2 flex flex-col items-center justify-center gap-3 ">
                <div className="w-full max-w-xs flex flex-col items-center gap-3">
                    <div className="w-full flex items-center justify-center">
                        <div className="w-20 h-20 flex items-center justify-center border-2 border-black rounded-full">
                            <IoLockClosedOutline size={55} />
                        </div>
                    </div>
                    <h3 className='font-bold'>Trouble logging in?</h3>
                    <p className='text-sm '>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3'>
                        <Input type='email' required onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setError(false);
                            setEmail(e.target.value)
                        }} value={email} placeholder='Enter Your Email' />
                        <button type='submit' className='w-full bg-blue-600 py-[1.3px] text-white hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border-[1px] rounded-md'>{
                            loading ?
                                <div className="w-full flex items-center justify-center">
                                    <Spin />
                                </div>

                                :
                                "Send Verfication code"
                        }</button>
                    </form>
                    {
                        error &&
                        <p className="text-red-400">
                            Credentials does't exist
                        </p>

                    }

                    <div className="w-full flex items-center gap-3">
                        <div className="w-full border-[1px] "></div>
                        <h1>OR</h1>
                        <div className="w-full border-[1px] "></div>
                    </div>

                    <Link className='text-xs hover:text-gray-400' href="/account/Signup">Create an account</Link>

                </div>
                <div className="w-full cursor-pointer flex items-center justify-center border-t-2 py-1 mt-2">
                    <Link className='text-xs hover:text-gray-400' href="/account/Login">Back to login</Link>
                </div>
            </div>
        </div>

    )
}

export default PasswordForget