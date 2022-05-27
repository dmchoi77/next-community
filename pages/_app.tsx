import { AppProps } from 'next/app'
import { globalStyles } from '../styles/style'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  )
}

export default App