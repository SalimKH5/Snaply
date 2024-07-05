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
                <li>À propos</li>
                <li>Blog</li>
                <li>Emplois</li>
                <li>Aide</li>
                <li>API</li>
                <li>Confidentialité</li>
                <li>Conditions</li>
                <li>Lieux</li>
                <li>Instagram Lite</li>
                <li>Threads</li>
                <li>Importation des contacts et non-utilisateurs</li>
                <li>Meta Verified</li>
              </ul>
              <ul style={{color:"rgb(115, 115, 115)"}} className="w-full flex items-center justify-center gap-3 py-2  text-[11px]">
                <li>Français</li>
                <li>© 2024 Instagram par Meta</li>
              </ul>
            </div>
          </div>
    </div>

  );
}
