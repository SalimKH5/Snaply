"use client"
import { Croissant_One } from 'next/font/google'
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import { MdOutlineVisibility,MdOutlineVisibilityOff } from "react-icons/md";

const croissant_One = Croissant_One({
  weight: "400",
  subsets: ["latin"],
});
const page = () => {
    const [visible,setVisible]=useState<boolean>(false);
  return (
    <div className='w-full h-full flex items-center justify-center  p-1 pt-6 '>
        <div className="w-full h-full max-w-xs flex flex-col gap-3 ">
               <div className="flex-[0.6] w-full border-[1px] border-[#c1c1cb] rounded-sm py-8">
                      <form className="w-full h-full flex flex-col gap-1 items-center ">
                                <div className="py-6 text-center px-8">
                                       <h1 className={`${croissant_One.className} text-4xl`}>Instagram</h1>
                                       <span style={{color:"rgb(115,115,115)"}}>Inscrivez-vous pour voir les photos et vidéos de vos amis.</span>
                                </div>
                                <div className="w-full px-8 py-1  cursor-pointer  text-lg text-center  flex items-center gap-2 justify-center">
                                    <button style={{background:"rgb(0,146,246)"}} className='flex box-border py-2 px-6 rounded-md items-center text-white gap-2 justify-center '>
                                    <FaFacebookSquare/>
                                    <span className='font-bold text-xs'>Se connecter avec Facebook</span>                   
                                    </button>
                                    
                                </div>
                                <div className="w-full px-8 py-1 flex items-center">
                                           <hr className='w-full'/>
                                           <h1 className='px-3'>OR</h1> 
                                           <hr className='w-full' /> 
                                </div>
                               
                                <div className="w-full px-8 flex flex-col gap-1">
                                    <input type="text" 
                                    className='w-full bg-[#fffefe] border-[1px] border-[#dedede] outline-[#f1eeee]  py-2 font-light rounded-md text-xs px-3 box-border'
                                    placeholder="Num.téléphone, nome d'uilisataeur ou e-mail" 
                                    />  
                                    <input type="text" 
                                    className='w-full bg-[#fffefe] border-[1px] border-[#dedede] outline-[#f1eeee]  py-2 font-light rounded-md text-xs px-3 box-border'

                                    placeholder="Nom Complet" 
                                    />  
                                    <input type="text" 
                                    className='w-full bg-[#fffefe] border-[1px] border-[#dedede] outline-[#f1eeee]  py-2 font-light rounded-md text-xs px-3 box-border'

                                    placeholder="Nom d'utilisateur" 
                                    />  
                                    <div className="w-full flex items-center  bg-[#fffefe] border-[1px] border-[#dedede] outline-[#f1eeee] py-2 font-light rounded-md text-xs px-3 box-border">
                                          <input type={visible?`text`:"password"} 
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
                                <div className="w-full py-6 text-xs flex flex-col gap-3 text-center">
                                            <span>
                                            Les personnes qui utilisent notre service ont pu importer vos coordonnées sur Instagram. 
                                            </span>  
                                            <span>
                                            En vous inscrivant, vous acceptez nos Conditions générales, notre Politique de confidentialité et notre Politique d&apos;utilisation des cookies.
                                            </span>   
                                </div>
                               
                                <div className="w-full px-8 py-3">
                                        <button className="w-full font-extrabold  box-border px-6 rounded-xl text-xs text-white py-2 bg-blue-500 hover:bg-[#5376e8]">
                                                    S&apos;inscrire
                                        </button>      
                                </div>
                                
                               
                                

                               

                      </form>
               </div>
               <div className="flex-[0.1] py-4 w-full text-sm border-[1px] border-[#c1c1cb] text-center rounded-md flex items-center  justify-center">
                            <p>Vous avez un compte ? 
                            <Link href="Login" style={{color:"rgb(0, 149, 246)"}} className='cursor-pointer'> Connectez-vous</Link></p>
                </div>


        </div>
    </div>
  )
}

export default page