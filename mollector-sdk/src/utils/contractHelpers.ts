import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'

import bep20Abi from '~/configurations/abi/erc20.json'
import MollectorCardAbi from '~/configurations/abi/MollectorCardAbi.json'
import MollectorDepositContract from '~/configurations/abi/MollectorDepositAbi.json'
import MollectorMarketplaceAbi from '~/configurations/abi/MollectorMarketplace.json'
import MollectorPackAbi from '~/configurations/abi/MollectorPackAbi.json'
import MollectorUtilAbi from '~/configurations/abi/MollectorUtilAbi.json'

import { getWeb3NoAccount } from './web3Utils'

export const getContract = (abi: any, address: string, web3: Web3): Contract | null => {
  const _web3 = web3 || getWeb3NoAccount()
  if (address) {
    return new _web3.eth.Contract(abi, address)
  }

  return null
}

export const getBep20Contract = (address: string, web3: Web3) => {
  if (address) {
    return getContract(bep20Abi, address, web3)
  }

  return null
}

export const getBuyPackContract = (web3: Web3, address: string) => {
  //@ts-ignore
  return getContract(MollectorPackAbi as AbiItem, address, web3)
}

export const getUtilContract = (web3: Web3, address: string) => {
  //@ts-ignore
  return getContract(MollectorUtilAbi as AbiItem, address, web3)
}

export const getCardContract = (web3: Web3, address: string) => {
  //@ts-ignore
  return getContract(MollectorCardAbi as AbiItem, address, web3)
}

export const getMarketplaceContract = (web3: Web3, address: string) => {
  //@ts-ignore
  return getContract(MollectorMarketplaceAbi as AbiItem, address, web3)
}

export const getDepositContract = (web3: Web3, address: string) => {
  //@ts-ignore
  return getContract(MollectorDepositContract as AbiItem, address, web3)
}
