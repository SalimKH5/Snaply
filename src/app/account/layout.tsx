import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/authOptions";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if(session){
    redirect('/')
  }
  return (
    <div className="w-full h-full flex items-center justify-center  ">
          <div className="w-full h-full  flex flex-col gap-8  ">
            {children}
            <div className="flex-[0.3] 2xl:flex-[0.2] w-full">
              <ul style={{color:"rgb(115, 115, 115)"}} className="w-full flex items-center justify-center flex-wrap gap-3 text-[10.5px] 2xl:text-[11px] py-2">
                <li>Meta</li>
                <li>About</li>
                <li>Blog</li>
                <li>Jobs</li>
                <li>Aide</li>
                <li>API</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Locations</li>
                <li>Threads</li>
                <li>Importing contacts and non-users</li>
                <li>Meta Verified</li>
              </ul>
              <ul style={{color:"rgb(115, 115, 115)"}} className="w-full flex items-center justify-center gap-3 py-2  text-[11px]">
                <li>English</li>
                <li>© 2024 Snaply </li>
              </ul>
            </div>
          </div>
    </div>

  );
}
