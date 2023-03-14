import Web3 from 'web3'

import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import configs from './configs'
import { InjectedConnectorConfig, WalletConnectorConfig } from './types'

export const getLibrary = (provider: any): Web3 => {
  return provider
}

export const setupNetwork = async () => {
  const provider = window.ethereum

  if (provider) {
    const chainId = configs.SUPPORTED_CHAINID
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
      return true
    } catch (switchError) {
      if ((switchError as any)?.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: `${configs.NETWORK}`,
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18,
                },
                rpcUrls: [`${configs.SUPPORTED_RPC}`],
              },
            ],
          })
          return true
        } catch (error) {
          console.error('Failed to setup the network', error)
          return false
        }
      }
      return false
    }
  } else {
    return false
  }
}

export type ConnectorTypes = WalletConnectConnector | InjectedConnector

// const chainIds = [configs.SUPPORTED_CHAINID]
// const injected = new InjectedConnector({ supportedChainIds: chainIds })

// const walletconnect = new WalletConnectConnector({
//   rpc: { 56: 'https://solitary-snowy-river.bsc.quiknode.pro/16b4e8d1466a4e5c06c88145a2faed83b3661fd9/' },
//   bridge: 'https://bridge.walletconnect.org',
//   qrcode: true,
// })

export const WalletConnectorFactoryFunction = (walletConnectorConfig: WalletConnectorConfig): WalletConnectConnector =>
  new WalletConnectConnector(walletConnectorConfig)
export const InjectedConnectorFactoryFunction = (injectedConnectorConfig: InjectedConnectorConfig): InjectedConnector =>
  new InjectedConnector(injectedConnectorConfig)
