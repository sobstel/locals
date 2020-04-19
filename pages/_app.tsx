import { AppProps } from "next/app";

import "../tailwind.css";
import "antd/dist/antd.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
