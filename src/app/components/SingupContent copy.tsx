
"use client"
import { useState } from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import { MdOutlineVisibility,MdOutlineVisibilityOff } from "react-icons/md";
import { Croissant_One } from 'next/font/google'
import { useRouter } from 'next/navigation';
import api from "../ApiConfig"
import { Spin } from 'antd';
const croissant_One = Croissant_One({
  weight: "400",
  subsets: ["latin"],
});

type User={
  email:string,
  password:string,
  fullName:string,
  username:string,
}



const SingupContent = () => {
  const [visible,setVisible]=useState<boolean>(false);
  const [loading,setLoading]=useState<boolean>(false);
  const [userData,setUserData]=useState<User>(
    {
      email:"",
    password:"",
    fullName:"",
    username:"",
    }
  )
  const router = useRouter();

    const onHandleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
      
       
        try {
         
          setLoading(true);
       
         
              const result=await fetch(api.register_client,{
                method:"POST",
                headers:{
                  "Content-type":"application/json"
                },
                body:JSON.stringify(userData)
              })
             
              if(result.ok){
               
                  const data=await result.json();
                  alert('account succesfully created')
                 
                  router.push('/account/Login')
                  router.refresh();
              
                   
              }else{
                console.log('there is an error ');
                alert("user alerdy exist")
              }

          
        } catch (error) {
          console.log({error});
         
        }finally{
          setLoading(false);
        }

    }



   


  return (
    <form 
    onSubmit={onHandleSubmit}
    className="w-full h-full flex flex-col gap-1 items-center ">
    <div className="py-6 text-center px-8">
           <h1 className={`${croissant_One.className} text-4xl`}>Instagram</h1>
           <span style={{color:"rgb(115,115,115)"}}>Sign up to see photos and videos from your friends..</span>
    </div>
    
   
    <div className="w-full px-8 flex flex-col gap-1">
        <input type="text" 
        className='w-full bg-[#fffefe] border-[1px] border-[#dedede] outline-[#f1eeee]  py-2 font-light rounded-md text-xs px-3 box-border'
        placeholder="e-mail"
        value={userData.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUserData((prev:User)=>({
          ...prev,
          email:e.target.value
        }))}

        />  
        <input type="text" 
        className='w-full bg-[#fffefe] border-[1px] border-[#dedede] outline-[#f1eeee]  py-2 font-light rounded-md text-xs px-3 box-border'

        placeholder="FullName" 
        value={userData.fullName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUserData((prev:User)=>({
          ...prev,
          fullName:e.target.value
        }))}
        />  
        <input type="text" 
        className='w-full bg-[#fffefe] border-[1px] border-[#dedede] outline-[#f1eeee]  py-2 font-light rounded-md text-xs px-3 box-border'

        placeholder="Nom d'utilisateur"
        value={userData.username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUserData((prev:User)=>({
          ...prev,
          username:e.target.value
        }))} 
        />  
        <div className="w-full flex items-center  bg-[#fffefe] border-[1px] border-[#dedede] outline-[#f1eeee] py-2 font-light rounded-md text-xs px-3 box-border">
              <input type={visible?`text`:"password"} 
              className='flex-1 outline-none w-full'
              placeholder="Mot de passe" 
              value={userData.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUserData((prev:User)=>({
                ...prev,
                password:e.target.value
              }))} 
              />  
            
              {
                visible?
                <MdOutlineVisibility className='cursor-pointer' onClick={()=>setVisible((prev:boolean)=>!prev)}/>:
                <MdOutlineVisibilityOff 
                className='cursor-pointer'
                onClick={()=>setVisible((prev:boolean)=>!prev)}
                
                />
              }
             
          </div>    
    </div> 
    <div className="w-full py-6 text-xs flex flex-col gap-3 text-center">
                <span>
                People who use our service may have uploaded your contact information to Instagram.
                </span>  
                <span>
                By signing up, you agree to our Terms, Privacy Policy, and Cookie Use Policy.
                </span>   
    </div>
   
    <div className="w-full px-8 py-3">
            <button className="w-full font-extrabold  box-border px-6 rounded-xl text-xs text-white py-2 bg-blue-500 hover:bg-[#5376e8]">
                       {
                        loading?
                        <Spin/>:
                       " Sign up"
                       } 
            </button>      
    </div>
</form>
  )
}

export default SingupContent