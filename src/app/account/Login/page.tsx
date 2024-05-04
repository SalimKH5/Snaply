import React from "react";
import AppDisplay from "./components/AppDisplay";
import LoginContainer from "./components/LoginContainer";


const page = async () => {

  
  return (
        <div className="w-full h-full flex items-center justify-center lg:grid lg:grid-cols-2 flex-1">
          <AppDisplay />
          <LoginContainer />
        </div>

  );
};

export default page;
