import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContextProvider } from '../lib/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp
