
import { getServerSession } from "next-auth";
import { authOptions } from '../../lib/authOptions';
import Sidebar from "@/app/components/Sidebar";
import { redirect } from "next/navigation";
import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";
const page = async ({ params }: { params: { username: string } }) => {

    const session = await getServerSession(authOptions);
    if (session?.user.username === params.username) {
       

        
        return (


            <div className="w-full h-full md:ml-[13%] lg:ml-[25%] px-2 flex-grow flex items-center justify-center  lg:max-w-4xl mx-auto flex-col">
                <div className='w-full h-full  py-10 flex flex-col gap-5 lg:gap-16  mx-auto'>
                    <div className="w-full flex items-center justify-between max-w-xl flex-col lg:max-w-2xl gap-4 lg:gap-8">
                        <div className="w-full px-4 py-2 bg-slate-200 rounded-lg flex justify-between items-center ">
                            <div className="w-full flex items-center gap-3">
                                <div className=" rounded-full   p-[1px] flex items-center justify-center 
                                            w-14 h-14
                                        ">
                                    <img src="/picture.jpg" className='w-full h-full rounded-full object-cover  cursor-pointer  ' alt="" />
                                </div>
                            </div>
                            <button className="bg-blue-400 hover:bg-blue-200 text-white hover:text-blue-950 py-2 px-4  rounded-lg">Change the picture</button>

                        </div>
                        <form action="" className="w-full ">
                            <div className="w-full py-2">
                                <h1>Gender</h1>
                                <Select
                                    value={session.user.gender}

                                    className="w-full"
                                    options={[
                                        { value: 'Male', label: 'Male' },
                                        { value: 'Female', label: 'Female' },

                                    ]}
                                />
                            </div>
                            <div className="w-full py-2">
                                <h1>Bio</h1>
                                <TextArea
                                    value={session.user.bio}

                                    showCount
                                    maxLength={150}
                                    placeholder="Enter your Bio"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                            </div>
                        </form>



                    </div>
                </div>
            </div>



        )
    } else {
        redirect('/')
    }

}

export default page