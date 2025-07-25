"use client"

import { Croissant_One } from 'next/font/google'
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import { MdOutlineVisibility,MdOutlineVisibilityOff } from "react-icons/md";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ConfigProvider, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const croissant_One = Croissant_One({
  weight: "400",
  subsets: ["latin"],
});


type User={
 
  email:string;
  password:string;
}



const LoginContainer = () => {
  
    const [visible,setVisible]=useState<boolean>(false);

    const [userData,setUserData]=useState<User>({
      email:"",
      password:"",
    })
    const [loading,setLoading]=useState<boolean>(false);
    const router = useRouter();

    const handleSubmit=async (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      setLoading(true);
    try{
      const result=await  signIn("credentials", {
        email: userData?.email,
        password: userData?.password,
        redirect: false,
      })
      
      if(result?.ok){
        setLoading(false)
            router.push('/');
            router.refresh();
            

      }else{
        alert('authentifcation avec refusée');
        setLoading(false)

      }
    }catch(err){
        console.error({err});
        setLoading(false)

    }
     
    }

    

  return (
    <div className='w-full h-full p-1 pt-6 '>
        <div className="w-full h-full flex flex-col gap-3 ">
               <div className="flex-[0.6] w-full border-[1px] border-[#c1c1cb] rounded-sm py-8">
                      <form 
                          onSubmit={handleSubmit}
                      className="w-full h-full flex flex-col gap-1 items-center ">
                                <div className="py-6">
                                       <h1 className={`${croissant_One.className} text-4xl`}>Snaply</h1>
                                </div>
                                <div className="w-full px-8 flex flex-col gap-1">
                                    <input 
                                     value={userData.email}
                                     onChange={(e:any)=>setUserData((prev:User)=>({...prev,email:e.target.value}))}
                                    type="email" 
                                    className='w-full bg-[#fffefe] border-[1px] border-[#dedede] outline-[#f1eeee]  py-2 font-light rounded-md text-xs px-3 box-border'

                                    placeholder="e-mail" />  
                                    <div className="w-full flex items-center  bg-[#fffefe] border-[1px] border-[#dedede] outline-[#f1eeee] py-2 font-light rounded-md text-xs px-3 box-border">
                                          <input 
                                           value={userData.password}
                                           onChange={(e:any)=>setUserData((prev:User)=>({...prev,password:e.target.value}))}
                                          type={visible?`text`:"password"} 
                                          className='flex-1 outline-none w-full'
                                          placeholder="Mot de passe" />  
                                          {
                                            visible?
                                            <MdOutlineVisibility className='cursor-pointer' onClick={()=>setVisible((prev:boolean)=>!prev)}/>:
                                            <MdOutlineVisibilityOff 
                                            className='cursor-pointer'
                                            onClick={()=>setVisible((prev:boolean)=>!prev)}/>
                                          }
                                         
                                      </div>    
                                    
                                </div> 
                                <div className="w-full px-8 py-3">
                                        <button className="w-full font-extrabold  box-border  px-6 rounded-xl text-xs text-white py-2 bg-blue-500 hover:bg-[#9aadec]">
                                             {
                                              loading?
                                              <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary:"#fff"
                        },
                      }}
                    >
                      <Spin indicator={<LoadingOutlined spin className='text-white' />} />
                    </ConfigProvider>
                                              :
                                             "Log in"
                                             } 
                                        </button>      
                                </div>
                                
                              
                                <div className="w-full px-8 pt-4 cursor-pointer text-xs text-center flex items-center gap-2 justify-center text-[#385185]">
                                   <Link href="/account/ForgetPassword">Forgot your password?</Link>
                                </div>

                               

                      </form>
               </div>
               <div className="flex-[0.1] py-4 w-full text-sm border-[1px] border-[#c1c1cb] text-center rounded-md flex items-center  justify-center">
                            <p>Don&apos;t have an account? 
                              <Link href="Signup" style={{color:"rgb(0, 149, 246)"}} className='cursor-pointer'>Sign up</Link></p>
                </div>


        </div>
    </div>
  )
}

export default LoginContainer