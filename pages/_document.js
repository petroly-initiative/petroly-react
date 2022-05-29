import Document, { Html, Head, Main, NextScript } from "next/document";
import { GoogleFonts } from "next-google-fonts";

class MyDocument extends Document {
  render() {
    return (
      <>
        <Html lang="ar">
          <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" />
          <Head>
            <meta
              name="description"
              content="Digital Platform for All KFUPMers"
            />

            <link rel="manifest" href="/manifest.json" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://react.petroly.co/" />
            <meta property="og:title" content="Petroly | home" />
            <meta
              property="og:description"
              content="Digital Platform for All KFUPMers"
            />
            <meta property="og:image" content="/images/website-header.png" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://react.petroly.co/" />
            <meta property="twitter:title" content="Petroly | home" />
            <meta
              property="twitter:description"
              content="Digital Platform for All KFUPMers"
            />
            <meta
              property="twitter:image"
              content="/images/website-header.png"
            />
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
