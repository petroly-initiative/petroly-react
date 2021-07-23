import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Head from 'next/head';
/**
 * 
 * @WARNING This file exists to only apply globals.css for all pages 
 */
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Petroly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
