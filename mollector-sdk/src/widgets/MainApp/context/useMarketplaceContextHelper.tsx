import { useContext, useMemo } from 'react'

import { useWeb3React } from '@web3-react/core'

import { IPackPayToken, MarketplaceContext } from './MarketplaceContext'

export interface IMarketPlacePayment {
  DECIMAL: number
  NAME: string
  SYMBOL: string
  ADDRESS: string
}

export interface IToken {
  label: string
  value: string
  decimal: number
  currency: string
  rate: number
}

export interface IContractConfig {
  marketplaceAddress?: string
  mollectorEscrowAddress?: string
  mollectorUtilsAddress?: string
  mollectorCardAddress?: string
  mollectorPackAddress?: string
  packsInfo?: Record<number, IPackPayToken>
  marketplacePayments?: IMarketPlacePayment[]
  depositTokens?: IToken[]
  withdrawTokens?: IToken[]
}

const useMarketplaceContextHelper = (): IContractConfig => {
  const { chainId } = useWeb3React()
  const { state } = useContext(MarketplaceContext)
  const { marketplaceConfig } = state

  const MARKETPLACE_ADDRESS = useMemo(() => {
    if (chainId) {
      return marketplaceConfig[chainId]?.MOLLECTOR_MARKET?.ADDRESS
    }

    return ''
  }, [chainId, marketplaceConfig])

  const MOLLECTOR_ESCROW_ADDRESS = useMemo(() => {
    if (chainId) {
      return marketplaceConfig[chainId]?.MOLLECTOR_ESCROW?.ADDRESS
    }

    return ''
  }, [chainId, marketplaceConfig])

  const MOLLECTOR_UTILS_ADDRESS = useMemo(() => {
    if (chainId) {
      return marketplaceConfig[chainId]?.MOLLECTOR_UTILS?.ADDRESS
    }

    return ''
  }, [chainId, marketplaceConfig])

  const MOLLECTOR_CARD_ADDRESS = useMemo(() => {
    if (chainId) {
      return marketplaceConfig[chainId]?.MOLLECTOR_CARD?.ADDRESS
    }

    return ''
  }, [chainId, marketplaceConfig])

  const PACK_INFO = useMemo(() => {
    if (chainId) {
      return marketplaceConfig[chainId]?.MOLLECTOR_PACK?.Price
    }
  }, [chainId, marketplaceConfig])

  const MOLLECTOR_PACK_ADDRESS = useMemo(() => {
    if (chainId) {
      return marketplaceConfig[chainId]?.MOLLECTOR_PACK?.ADDRESS
    }

    return ''
  }, [chainId, marketplaceConfig])

  const MARKETPLACE_PAYMENTS = useMemo(() => {
    const payments: IMarketPlacePayment[] = []
    if (chainId && marketplaceConfig[chainId]?.MOLLECTOR_MARKET?.PAYMENT_TOKENS) {
      Object.keys(marketplaceConfig[chainId]?.MOLLECTOR_MARKET?.PAYMENT_TOKENS).forEach((key) => {
        payments.push({
          ...marketplaceConfig[chainId]?.MOLLECTOR_MARKET?.PAYMENT_TOKENS[key],
          ADDRESS: key,
        })
      })
    }

    return payments
  }, [chainId, marketplaceConfig])

  const depositTokens = useMemo<IToken[] | undefined>(() => {
    if (chainId) {
      const tokenList = marketplaceConfig[chainId]?.DEPOSIT_TOKENS

      return tokenList?.map((t) => {
        return {
          label: t.SYMBOL,
          value: t.ADDRESS,
          currency: t.CURRENCY,
          decimal: t.DECIMALS,
          rate: t.RATE || 1,
        }
      })
    }

    return []
  }, [chainId, marketplaceConfig])

  const withdrawTokens = useMemo<IToken[] | undefined>(() => {
    if (chainId) {
      const tokenList = marketplaceConfig[chainId]?.WITHDRAW_TOKENS

      return tokenList?.map((t) => {
        return {
          label: t.SYMBOL,
          value: t.ADDRESS,
          currency: t.CURRENCY,
          decimal: t.DECIMALS,
          rate: t.RATE || 1,
        }
      })
    }

    return []
  }, [chainId, marketplaceConfig])

  return {
    marketplaceAddress: MARKETPLACE_ADDRESS,
    mollectorEscrowAddress: MOLLECTOR_ESCROW_ADDRESS,
    mollectorUtilsAddress: MOLLECTOR_UTILS_ADDRESS,
    mollectorCardAddress: MOLLECTOR_CARD_ADDRESS,
    mollectorPackAddress: MOLLECTOR_PACK_ADDRESS,
    marketplacePayments: MARKETPLACE_PAYMENTS,
    packsInfo: PACK_INFO,
    depositTokens,
    withdrawTokens,
  }
}

export default useMarketplaceContextHelper
