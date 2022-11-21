import type { AppProps } from "next/app";
import "../App.css";
import "../index.css";
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
