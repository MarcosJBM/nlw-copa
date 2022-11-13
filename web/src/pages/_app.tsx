import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';

import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
