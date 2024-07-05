"use client"
import { Input, Spin } from 'antd';
import Link from 'next/link';
import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'
import { IoLockClosedOutline } from 'react-icons/io5';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
//@ts-ignore
import OTPInput from "otp-input-react";
import ApiConfig from '../ApiConfig';
import { useRouter } from "next/navigation";
const ResetPass = () => {



    const [error, setError] = useState<boolean>(false);
    const [OTP, setOTP] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [resultChecked, setResultChecked] = useState<boolean>(false);
    const email: string | null = localStorage.getItem('email');
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        try {
            const result = await fetch(ApiConfig.CodeVerfication, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    code: OTP
                })
            })

            if (result.ok) {
                const data = await result.json();
                console.log({ data });

                setLoading(false);
                setResultChecked(true);
            } else {
                console.log("error");
                setError(true);
                setLoading(false);
            }
        } catch (error) {
            console.log({ error });
            setError(true);
            setLoading(false);
        }
    }

    const router = useRouter();

    const handleSubmitNewPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        try {
            const result = await fetch(ApiConfig.ResetPassword, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            if (result.ok) {
                const data = await result.json();
                console.log({ data });
                localStorage.removeItem("email");
                setLoading(false);
                setResultChecked(true);
            } else {
                console.log("error");
                setError(true);
                setLoading(false);
                router.push('/account/Login');
            }
        } catch (error) {
            console.log({ error });
            setError(true);
            setLoading(false);
        }
    }
    if (!email) {
        router.push('/account/Login');
    }

    console.log(email); // Output: example@example.com
    console.log({ OTP }); // Output: example@example.com



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
                    <p className='text-sm text-center '>Enter the code which we sended to your Gmail account.</p>
                    {
                        resultChecked ?
                            <form onSubmit={handleSubmitNewPassword} className='w-full flex flex-col gap-8'>

                                <Input.Password
                                    placeholder="input password"
                                    iconRender={(visible) => (visible ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />)}


                                    value={password}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    type="password"
                                    className='flex-[0.8] bg-blue-600 outline-none w-full'
                                />





                                <button type='submit' className='w-full text-sm bg-blue-600 py-[1.3px] text-white hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border-[1px] rounded-md'>{
                                    loading ?
                                        <div className="w-full flex-items-center justify-center">
                                            <Spin />
                                        </div>

                                        :
                                        "Reset Password"}</button>
                            </form>
                            :
                            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-8'>
                                <OTPInput
                                    value={OTP}
                                    onChange={setOTP}
                                    autoFocus
                                    className="w-full flex h-[45px] items-center justify-center gap-3 mr-0 "
                                    inputStyles={{ height: "100%", width: "100%", margin: 0 }}
                                    OTPLength={6}
                                    inputClassName=" h-full text-lg  bg-[#DFDFDF] outline-none  border-none shadow-md rounded-xl border-2  "
                                    disabled={false}
                                />
                                <button type='submit' className='w-full text-sm bg-blue-600 py-[1.3px] text-white hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border-[1px] rounded-md'>{
                                    loading ?
                                        <div className="w-full flex-items-center justify-center">
                                            <Spin />
                                        </div>

                                        :
                                        "Check"}</button>
                            </form>
                    }


                    {
                        error &&
                        <p className="text-red-400">
                            Credentials does&apost exist
                        </p>

                    }




                </div>
                <div className="w-full cursor-pointer flex items-center justify-center border-t-2 py-1 mt-2">
                    <Link className='text-xs hover:text-gray-400' href="/account/Login">Back to login</Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPass