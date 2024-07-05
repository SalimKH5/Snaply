import React from "react";
import AppDisplay from "./components/AppDisplay";
import LoginContainer from "./components/LoginContainer";


const page = async () => {

  
  return (
        <div className="w-full h-full flex items-center justify-center py-3 lg:grid lg:grid-cols-2 flex-1 mx-auto max-w-md md:max-w-xl lg:max-w-4xl 2xl:max-w-4xl">
          <AppDisplay />
          <LoginContainer />
        </div>

  );
};

export default page;
