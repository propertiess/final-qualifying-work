import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/logo.png' />
        {/*  вставить шрифт */}
        {/* глобально для всех страниц */}
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
