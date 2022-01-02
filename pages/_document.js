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