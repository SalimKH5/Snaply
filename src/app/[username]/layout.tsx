
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getServerSession } from "next-auth";
import Sidebar from "../components/Sidebar";
import { redirect } from "next/navigation";
import { authOptions } from '../lib/authOptions';
import BottmNavigation from "../components/BottmNavigation";
import Navbar from "../components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Instagram Clone",
    description: "Instagram Clone Mad with Next.js",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/account/Login')
      }else{
       
        return (

            <div className="overflow-y-auto flex z-10 h-screen gap-5 py-16 md:py-2">
                    <Navbar/>
                    <Sidebar token={session?.user?.token} username={session?.user?.username} />
                    <BottmNavigation  token={session?.user?.token}/>
                
                {children}
            </div>
              );
    
      }
    

  
}
