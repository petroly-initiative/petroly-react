import Document, {Html, Head, Main, NextScript} from "next/document";
import { GoogleFonts } from "next-google-fonts";

class MyDocument extends Document{
    render(){
        return (
          <>
            <Html lang="ar">
              <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" />
              <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="theme-color" content="#fff" />
                <meta name="title" content="Petroly | home" />
                <meta
                  name="description"
                  content="Petroly intiative is a platform to serve the digital needs for all kfupmers"
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://petroly.vercel.app/" />
                <meta property="og:title" content="Petroly | home" />
                <meta
                  property="og:description"
                  content="Petroly intiative is a platform to serve the digital needs for all kfupmers"
                />
                <meta
                  property="og:image"
                  content="/images/website-header.png"
                />

                <meta property="twitter:card" content="summary_large_image" />
                <meta
                  property="twitter:url"
                  content="https://petroly.vercel.app/"
                />
                <meta property="twitter:title" content="Petroly | home" />
                <meta
                  property="twitter:description"
                  content="Petroly intiative is a platform to serve the digital needs for all kfupmers"
                />
                <meta property="twitter:image" content="" />
              </Head>
              <body>
                <Main />
                <NextScript />
              </body>
            </Html>
          </>
        );
    }
}

export default MyDocument;