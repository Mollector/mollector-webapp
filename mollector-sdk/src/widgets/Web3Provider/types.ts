import { ReactNode } from 'react'

export interface Web3ProviderProps {
  children: ReactNode
}

export interface IProviderInfo {
  /** Address of the current connected account */
  account: string
  /** Provider */
  library: any
  /** Chain id */
  chainId: number
}

export interface IRPCMap {
  [chainId: number]: string
}
export interface WalletConnectorConfig {
  rpc: IRPCMap
  bridge: string
  qrcode: boolean
}

export interface InjectedConnectorConfig {
  supportedChainIds: number[]
}
