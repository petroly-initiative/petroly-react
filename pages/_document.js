import Document, { Html, Head, Main, NextScript } from "next/document";


class MyDocument extends Document {


  
  render() {
    return (
      <>
        <Html lang="ar">
           <Head>
            <meta
              name="description"
              content="Digital Platform for All KFUPMers"
            />

            <link rel="manifest" href="/manifest.json" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://petroly.co/" />
            <meta property="og:title" content="Petroly | home" />
            <meta
              property="og:description"
              content="Digital Platform for All KFUPMers"
            />
            {/* TODO: adding another og:image tag and oh:imahr:secure_url for WA */}
            <meta
              property="og:image"
              content="https://res.cloudinary.com/petroly-initiative/image/upload/v1642961963/general/website-header_qljjje.png"
            />
            <meta
              property="og:image:secure_url"
              content="https://res.cloudinary.com/petroly-initiative/image/upload/v1642961963/general/website-header_qljjje.png"
            />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://petroly.co/" />
            <meta property="twitter:title" content="Petroly | home" />
            <meta
              property="twitter:description"
              content="Digital Platform for All KFUPMers"
            />
            <meta
              property="twitter:image"
              content="https://res.cloudinary.com/petroly-initiative/image/upload/v1642961963/general/website-header_qljjje.png"
            />
            <meta
              property="twitter:image:src"
              content="https://res.cloudinary.com/petroly-initiative/image/upload/v1642961963/general/website-header_qljjje.png"
            />
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4435926247205725"
              crossOrigin="anonymous"
            ></script>
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
