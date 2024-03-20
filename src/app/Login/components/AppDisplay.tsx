
import Image from 'next/image';

import OverlappingImages from './OverlappingImages';
const AppDisplay = () => {

  const images = [
    '/screenshot2-2x.png',
    '/screenshot3-2x.png',
    '/screenshot4-2x.png'
  ];

  return (
    <div className="w-full h-full hidden lg:flex items-center justify-center">
      <div className='w-[400px] h-[680px] relative bg-[url(/home-phones-2x.png)] bg-contain bg-no-repeat'> 
      {/* <Image src="/screenshot2-2x.png" width={162} height={180} 
      className=' absolute right-10 py-4' alt=""/> */}

      <OverlappingImages 
      images={images}
      transitionDuration={800}
      delay={2000}

      />
      
      </div>
     
    </div>
  );
};

export default AppDisplay;
