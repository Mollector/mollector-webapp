import React from 'react'

import { Web3ReactProvider } from '@web3-react/core'

import { Web3ProviderProps } from './types'
import { getLibrary } from './web3'

const Web3Provider = ({ children }: Web3ProviderProps) => {
  return <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
}

export default Web3Provider
