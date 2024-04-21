import React from "react";
import AppDisplay from "./components/AppDisplay";
import LoginContainer from "./components/LoginContainer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const page = async () => {

  
  return (
        <div className="w-full h-full flex items-center justify-center lg:grid lg:grid-cols-2 flex-1">
          <AppDisplay />
          <LoginContainer />
        </div>

  );
};

export default page;
