// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/globals.css";
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
// export default MyApp;
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* header */}
      <Head>
        <script
          charSet="utf-8"
          src="https://static.line-scdn.net/liff/edge/2/sdk.js"
        ></script>
      </Head>
      <div suppressHydrationWarning>
        {typeof window === "undefined" ? null : <Component {...pageProps} />}
      </div>
    </>
  );
}
export default MyApp;
