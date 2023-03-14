import { useMemo } from 'react'
import { Contract } from 'web3-eth-contract'

import {
  getBuyPackContract,
  getCardContract,
  getDepositContract,
  getMarketplaceContract,
  getUtilContract,
} from '~/utils/contractHelpers'

import { useWeb3 } from '..'

export const useBuyPackContract = (address: string): Contract | null => {
  const web3 = useWeb3()
  return useMemo(() => getBuyPackContract(web3, address), [address, web3])
}

export const useMollectorCardContract = (address: string): Contract | null => {
  const web3 = useWeb3()
  return useMemo(() => getCardContract(web3, address), [address, web3])
}

export const useUtilContract = (address: string): Contract | null => {
  const web3 = useWeb3()
  return useMemo(() => getUtilContract(web3, address), [address, web3])
}

export const useMarketplaceContract = (address: string): Contract | null => {
  const web3 = useWeb3()
  return useMemo(() => getMarketplaceContract(web3, address), [address, web3])
}

export const useDepositCardContract = (address: string): Contract | null => {
  const web3 = useWeb3()
  return useMemo(() => getDepositContract(web3, address), [address, web3])
}
