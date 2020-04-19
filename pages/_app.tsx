import { AppProps } from "next/app";

/* purgecss ignore */
import "antd/dist/antd.css";
/* purgecss enable */
import "../style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
