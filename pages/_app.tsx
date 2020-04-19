import { AppProps } from "next/app";

import "antd/dist/antd.css";
import "../style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
