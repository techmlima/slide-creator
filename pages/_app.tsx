import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import '../styles/layout.css';
import '../styles/timeline.css';

import { Provider } from 'next-auth/client'
import SpinnerLoading from '../components/SpinnerLoading';  
import Router from "next/router";
import React from 'react';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false)
  
  React.useEffect(() => {
    const start = () => setLoading(true)
    const end = () => setLoading(false)

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
    <Provider session={pageProps.session}>
         <Layout>
            {loading ? (<SpinnerLoading />) : (<Component {...pageProps}/>)}
         </Layout>
    </Provider>
  )
}

export default MyApp