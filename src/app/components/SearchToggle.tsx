"use client"

import {ReactNode,createContext,useState,useContext, useRef} from "react";

interface IFormContext{
   
    toggle:boolean,
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    searchToggle: React.RefObject<HTMLImageElement>; // Corrected type for searchToggle
}



const SearchToggle=createContext<IFormContext>({
  
    toggle:false,
    setToggle:()=>{},
    searchToggle: { current: null }, // Initialize with null
});



interface IPrpos{
    children: ReactNode;
}

export function ToggleProvider({children}:IPrpos){
    const [ toggle,setToggle]=useState<boolean>(false);
    const searchToggle = useRef<HTMLImageElement>(null);
   

    return <SearchToggle.Provider value={{toggle,setToggle,searchToggle}}>{children}</SearchToggle.Provider>
};

export function useToggleState(){
    return useContext(SearchToggle);
}