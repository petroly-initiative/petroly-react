import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document{
    render(){
        return (
          <Html lang="ar">
            <Head>
              <link rel="manifest" href="/manifest.json" />
              <link rel="apple-touch-icon" href="/icon.png"></link>
              <meta name="theme-color" content="#fff" />
              <link
                href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap"
                rel="stylesheet"
              />
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        );
    }
}

export default MyDocument;