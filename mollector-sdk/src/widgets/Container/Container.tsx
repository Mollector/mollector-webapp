import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'

import ResetCSS from '~/ResetCSS'
import { Web3Provider } from '~/widgets/Web3Provider'

import { MarketplaceContextProvider } from '../MainApp/context/MarketplaceContext'

import { IContainer } from './types'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 10000,
    },
  },
})

const Container = ({ children }: IContainer) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <ResetCSS />
        <ToastContainer hideProgressBar />
        <MarketplaceContextProvider>{children}</MarketplaceContextProvider>
        <ReactQueryDevtools />
      </Web3Provider>
    </QueryClientProvider>
  )
}

export default Container
