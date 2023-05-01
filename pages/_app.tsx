import Layout from '@/components/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppProvider from "@/context/index"
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}
