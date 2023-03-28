import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className="h-full bg-gray-200 text-gray-500"
      data-theme="corporate"
    >
      <Head>
        <link rel="shortcut icon" href="/favicon-32x32.png" />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
