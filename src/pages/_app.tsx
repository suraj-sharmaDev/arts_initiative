import "../../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { ThemeContextProvider } from "@/theme/themeContext";
import type { AppPropsWithLayout } from "src/types";
import { AccountLayout } from "@/components/layouts";
import { Montserrat } from "@next/font/google";

const montesrrat = Montserrat({
  weight: ["200", "400", "700"],
  subsets: ["latin"],
});

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { session, ...props } = pageProps;

  const getLayout =
    Component.getLayout || ((page) => <AccountLayout>{page}</AccountLayout>);

  return (
    <div className={montesrrat.className}>
      <ThemeContextProvider>
        <SessionProvider>
          <Toaster />
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default appWithTranslation(App);
