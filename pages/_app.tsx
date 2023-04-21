import {ReactElement, ReactNode} from 'react'
import {NextPage} from 'next'
import type {AppProps} from 'next/app'
import ErrorBoundary from '@/components/errorBoundary'
import Layout from '@/components/layout'
import {Analytics} from '@vercel/analytics/react'
import '@/styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({
  Component,
  pageProps
}: AppPropsWithLayout): JSX.Element {
  // const getLayout = Component.getLayout ?? ((page) => page)
  // return getLayout(<Component {...pageProps} />)

  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </ErrorBoundary>
  )
}
