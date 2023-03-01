import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html style={{ opacity: 0 }}>
      <Head>
        <link rel='icon' href='/logo.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
