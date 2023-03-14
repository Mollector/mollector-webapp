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
