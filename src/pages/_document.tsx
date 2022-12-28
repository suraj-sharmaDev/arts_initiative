import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className="h-full bg-gray-50 text-gray-500"
      data-theme="corporate"
    >
      <Head />
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
