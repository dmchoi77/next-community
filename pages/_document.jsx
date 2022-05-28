import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <title>개발 커뮤니티</title>
          <meta charSet="utf-8"></meta>
          <body>
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html>
    );
  }
}
