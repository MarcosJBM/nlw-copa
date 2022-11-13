import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app';

import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
