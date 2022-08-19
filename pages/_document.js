import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <>
        <Html lang="ar">
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossorigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap"
              rel="stylesheet"
            ></link>
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
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta
              property="og:image:secure_url"
              content="https://res.cloudinary.com/petroly-initiative/image/upload/v1642961963/general/website-header_qljjje.png"
            />
            <meta
              property="og:image"
              content="https://res.cloudinary.com/petroly-initiative/image/upload/v1659611338/general/manifest_wa_wluj2r.png"
            />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="400" />
            <meta property="og:image:height" content="400" />

            <meta
              property="og:image:secure_url"
              content="https://res.cloudinary.com/petroly-initiative/image/upload/v1659611338/general/manifest_wa_wluj2r.png"
            />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="black"
            />

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
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/favicon/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/favicon/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
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
