
import SingupContent from '@/app/components/SingupContent';
import Link from 'next/link';
import api from "../../ApiConfig"


const Signup = () => {

  return (
    <div className='w-full h-full flex items-center justify-center  p-1 pt-6 '>
        <div className="w-full h-full max-w-xs flex flex-col gap-3 ">
               <div className="flex-[0.6] w-full border-[1px] border-[#c1c1cb] rounded-sm py-8">
                      <SingupContent/>
               </div>
               <div className="flex-[0.1] py-4 w-full text-sm border-[1px] border-[#c1c1cb] text-center rounded-md flex items-center  justify-center">
                            <p>Do you have an account?
                            <Link href="Login" style={{color:"rgb(0, 149, 246)"}} className='cursor-pointer'> Log in</Link></p>
                </div>


        </div>
    </div>
  )
}

export default Signup