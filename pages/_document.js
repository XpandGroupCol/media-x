import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initalProps = await Document.getInitialProps(ctx)

    return initalProps
  }

  render () {
    return (
      <Html>
        <Head>
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
          <script type='text/javascript' src='https://checkout.wompi.co/widget.js' />
        </Head>
        <body style={{ minHeigth: '100%' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
