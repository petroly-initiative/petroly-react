import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
/**
 *
 * @WARNING This file exists to only apply globals.css for all pages
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
