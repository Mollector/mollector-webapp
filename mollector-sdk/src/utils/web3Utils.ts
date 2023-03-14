import Web3 from 'web3'

export const RPC_URL: Record<number, string> = {
  56: 'https://dry-purple-forest.bsc.quiknode.pro/83528916be057ba132db188808697bf7cd64232d/',
  88: 'https://rpc.tomochain.com',
  89: 'https://testnet.tomochain.com',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
}

const getRpcUrl = (chainId?: number) => (chainId ? RPC_URL[chainId] : RPC_URL[56])

export const getWeb3BasedOnChainId = (chainId?: number) => {
  const RPC_URL = getRpcUrl(chainId)
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 })
  const web3 = new Web3(httpProvider)

  return web3
}

export const getWeb3NoAccount = () => getWeb3BasedOnChainId()

export const connectorLocalStorageKey = 'connectorIdv2'
