import React, { createContext, ReactNode, useReducer } from 'react'

import { initialState, reducer } from '../store/reducer'
import { Routes } from '../types'

interface IMarketplaceContextProvider {
  children: ReactNode
}

export interface IFilters {
  type: string
  rarity: string
  tokenId: string
  star: string
  currPage: number
  sort: string
  sortKey: string
}

interface ITokenInfo {
  tokenAddress: string
  tokenName: string
  tokenSymbol: string
}

export interface IPackPayToken {
  amount: string
  decimals: number
  symbol: string
  tokenAddress: string
}

export interface IChainConfig {
  RPC?: string
  CHAIN_ID?: string
  NETWORK_NAME?: string
  MOLLECTOR_CARD?: {
    ADDRESS?: string
    OPERATOR?: string
  }
  MOLLECTOR_ESCROW?: {
    ADDRESS?: string
    OPERATOR?: string
  }
  MOLLECTOR_MARKET?: {
    ADDRESS?: string
    PAYMENT_TOKENS?: any
  }
  CARD_MINTER?: {
    ADDRESS?: string
    OWNER?: string
  }
  MOLLECTOR_UTILS?: {
    ADDRESS?: string
  }
  MOLLECTOR_PACK?: {
    ADDRESS?: string
    OPERATOR?: string
    Price?: Record<number, IPackPayToken>
  }
  DEPOSIT_TOKENS?: {
    ADDRESS: string
    SYMBOL: string
    DECIMALS: number
    CURRENCY: string
    RATE: number
  }[]
  WITHDRAW_TOKENS?: {
    ADDRESS: string
    CURRENCY: string
    DECIMALS: number
    SYMBOL: string
    RATE: number
  }[]
}

export type IMarketplaceConfig = {
  [chainId: string]: IChainConfig
}
interface IMarketplaceContext {
  state: {
    histories: string[]
    currentRoutes: string
    newPackIds: string[]
    filters: IFilters
    marketplaceConfig: IMarketplaceConfig
  }
  dispatch: React.Dispatch<any>
}

export const initialValue: IMarketplaceContext = {
  state: {
    histories: [],
    currentRoutes: Routes.HOME,
    newPackIds: [],
    filters: {
      type: '',
      rarity: '',
      tokenId: '',
      star: '',
      currPage: 1,
      sort: '-1',
      sortKey: 'startedAt',
    },
    marketplaceConfig: {
      '56': {},
      '88': {},
    },
  },
  dispatch: (args: any) => {},
}

export const MarketplaceContext = createContext<IMarketplaceContext>(initialValue)

export const MarketplaceContextProvider = ({ children }: IMarketplaceContextProvider) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <MarketplaceContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  )
}
