import React from 'react'
import AppDisplay from './components/AppDisplay'

const page = () => {
  return (
    <div className='w-full h-full flex items-center justify-center py-4'>
        <div className="w-full h-full mx-auto max-w-4xl flex flex-col ">
                    <div className="w-full  h-full grid grid-cols-2 flex-1">
                        <AppDisplay/>
                    </div>
                    <div className="flex-[0.3] w-full"></div>
        </div>


    </div>
  )
}

export default page