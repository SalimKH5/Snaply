"use client"

import { Croissant_One } from 'next/font/google'
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import { MdOutlineVisibility,MdOutlineVisibilityOff } from "react-icons/md";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
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
      console.log({result})
      if(result?.ok){
        setLoading(false)
            router.push('/main');
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
                                       <h1 className={`${croissant_One.className} text-4xl`}>Instagram</h1>
                                </div>
                                <div className="w-full px-8 flex flex-col gap-1">
                                    <input 
                                     value={userData.email}
                                     onChange={(e:any)=>setUserData((prev:User)=>({...prev,email:e.target.value}))}
                                    type="email" 
                                    className='w-full bg-[#fffefe] border-[1px] border-[#dedede] outline-[#f1eeee]  py-2 font-light rounded-md text-xs px-3 box-border'

                                    placeholder="Num.téléphone, nome d'uilisataeur ou e-mail" />  
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
                                              <Spin/>
                                              :
                                             "Se connecter"
                                             } 
                                        </button>      
                                </div>
                                
                                <div className="w-full px-8 py-1 flex items-center">
                                           <hr className='w-full'/>
                                           <h1 className='px-3'>OR</h1> 
                                           <hr className='w-full' /> 
                                </div>
                                <div className="w-full px-8 py-1  cursor-pointer  text-lg text-center flex items-center gap-2 justify-center text-[#385185]">
                                    <FaFacebookSquare/>
                                    <span className='font-bold text-xs'>Se connecter avec Facebook</span>
                                </div>
                                <div className="w-full px-8 pt-4 cursor-pointer text-xs text-center flex items-center gap-2 justify-center text-[#385185]">
                                   <span>Mot de passe oublié?</span>
                                </div>

                               

                      </form>
               </div>
               <div className="flex-[0.1] py-4 w-full text-sm border-[1px] border-[#c1c1cb] text-center rounded-md flex items-center  justify-center">
                            <p>Vous n&apos;avez pas de compte ? 
                              <Link href="Signup" style={{color:"rgb(0, 149, 246)"}} className='cursor-pointer'> Inscrivez-vous</Link></p>
                </div>


        </div>
    </div>
  )
}

export default LoginContainer