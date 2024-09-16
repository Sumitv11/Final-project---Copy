import SnackbarComponent from "@/Components/SnackbarComponent";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <SnackbarComponent />
    </Provider>
  );
}
