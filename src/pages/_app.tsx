import React from 'react';
import '@/styles/global.scss';
import { AppProps } from 'next/app'; 

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
