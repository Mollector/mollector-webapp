import { Dispatch } from 'react'

export type Handler = () => void

export type DispatchState<T> = Dispatch<T>

export enum ChainId {
  MAINNET = 1,
  TOMOCHAIN_TESTNET = 89,
  TOMOCHAIN_MAINNET = 88,
  BINANCE_MAINNET = 56,
}

export enum WALLET {
  METAMASK = 'Metamask',
  WALLETCONNECT = 'WalletConnect',
}

export const NETWORK_MAPPING: { [chainId: number]: string } = {
  56: 'Binance Smart Chain',
  88: 'Tomo Mainnet',
  89: 'Tomo Testnet',
}
