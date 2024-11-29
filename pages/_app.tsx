import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import '../styles/layout.css';
import '../styles/timeline.css';

import { SessionProvider } from 'next-auth/react';  // Correct import for session provider
import SpinnerLoading from '../components/SpinnerLoading';  
import Router from "next/router";
import React from 'react';
import Layout from '../components/Layout/Layout';
import { AppProps } from 'next/app';  // Importing type for pageProps

function MyApp({ Component, pageProps }: AppProps) {  // Use AppProps to type pageProps
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <SessionProvider session={pageProps.session}>  {/* Corrected from Provider to SessionProvider */}
      <Layout>
        {loading ? <SpinnerLoading /> : <Component {...pageProps} />}
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
