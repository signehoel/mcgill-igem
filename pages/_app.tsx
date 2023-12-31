// import '../styles/globals.css'
// import type { AppProps } from 'next/app'
// import { useEffect } from 'react';

// function MyApp({ Component, pageProps }: AppProps) {
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//             const loader = document.getElementById('globalLoader');
//         if (loader)
//             loader.style.display = 'none';
//     }
// }, []);
//   return <Component {...pageProps} />
// }

// export default MyApp


import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loading from '../components/common/loading';
import PageLoader from 'next/dist/client/page-loader';
import Layout from "../components/common/layout";

const MyApp = ({
  Component, 
  pageProps,
}: AppProps) => {    
    const router = useRouter();
    const [pageLoading, setPageLoading] =useState<boolean>(false);

    useEffect(() => {
        const handleStart = (url: string) => {
          if (url !== router.pathname) {
            setPageLoading(true);
          }
        };
    
        const handleComplete = () => {
          setPageLoading(false);
        };
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);


        return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
      };
    }, [router]);

return (
  <Layout pageLoading={pageLoading}>
      {pageLoading ? <Loading/> :  <Component {...pageProps} />}
  </Layout>

)
}

export default MyApp