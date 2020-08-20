import "bootstrap/dist/css/bootstrap.css";
import { AppProps } from "next/app";

const app = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps}></Component>;
};
export default app;
