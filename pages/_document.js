import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {

  return (
    <Html lang="en" data-theme="light" dir="ltr">
      <Head>
        <meta name="description" content="Clarity Business App" />
        <title>:: CBS - Business ::</title>
      </Head>
      <body data-swift-theme="blue">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
