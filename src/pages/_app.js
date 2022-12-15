import React from "react";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";

import NavigationHelper from "./navigation";
import { store, persistor } from "src/client/redux/store";
import useTheme from "@/helpers/useTheme";

import "../../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

dynamic(
  () => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
    import("@popperjs/core");
  },
  {
    ssr: false,
  }
);

const DynamicCustomToast = dynamic(
  () => import("src/client/components/commons/customToast"),
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  const {theme} = useTheme();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Arts Commerce</title>
        </Head>
        <NavigationHelper Component={Component} {...pageProps} />
        <DynamicCustomToast />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
