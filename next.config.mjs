/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_SECRET: 'dROsngz4XClmQ6FMBh99ouSdNzK8mYn4lDORqdmGxQhm4VTOrAgXDfP/vSHV',
        
      },
      images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '**',
          },
          {
            protocol: 'https',
            hostname: '**',
          },
            {
              protocol: 'https',
              hostname: 'my-blob-store.public.blob.vercel-storage.com',
              port: '',
            },
        ],
      },
   
};

export default nextConfig;
