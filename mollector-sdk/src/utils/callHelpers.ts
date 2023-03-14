import { BigNumber } from 'ethers'
import { Contract } from 'web3-eth-contract'

import { ZERO_ADDRESS } from '~/configurations/constants'
import { IWithdrawNFTInfo } from '~/hooks/mutations/useWithdrawCardMutation'

export const approveContract = async (
  contract: Contract,
  spenderAddress: string,
  account: null | string | undefined,
  amount: BigNumber,
) => {
  const res = await contract.methods.approve(spenderAddress, amount).send({
    from: account,
  })
  return res
}

export const buyPack = async (
  contract: Contract,
  quantity: string,
  amount: string,
  account: string | null | undefined,
  packType: string,
  payToken: string,
) => {
  const isNativeToken = payToken === ZERO_ADDRESS

  return contract.methods
    .buy(packType, quantity)
    .send({
      from: account,
      ...(isNativeToken && { value: amount }),
    })
    .on('transactionHash', (tx: any) => {
      return tx.transactionHash
    })
}

export const openPack = async (contract: Contract, tokenIds: string[], account: string | null | undefined) => {
  return contract.methods
    .open(tokenIds)
    .send({
      from: account,
    })
    .on('transactionHash', (tx: any) => {
      return tx.transactionHash
    })
}

export const sellNft = async (
  account: string,
  marketplaceContract: Contract,
  nftAddress: string,
  tokenId: string,
  startingPrice: string,
  endingPrice: string,
  duration: string,
  payToken: string,
) => {
  return marketplaceContract.methods
    .createAuction(nftAddress, tokenId, startingPrice, endingPrice, duration, payToken)
    .send({
      from: account,
    })
    .on('transactionHash', (tx: any) => {
      return tx.transactionHash
    })
}

export const approveNftTokens = async (address: string, tokenContract: Contract, account: string) => {
  return tokenContract.methods
    .setApprovalForAll(address, true)
    .send({
      from: account,
    })
    .on('transactionHash', (tx: any) => {
      return tx.transactionHash
    })
}

export const buyNft = async (
  mollectorMarketplaceContract: Contract,
  nftAddress: string,
  tokenId: number,
  payToken: string,
  account: string,
  amount: string,
  isNativeToken: boolean,
) => {
  return mollectorMarketplaceContract.methods
    .bid(nftAddress, tokenId, amount, payToken)
    .send({
      from: account,
      ...(isNativeToken && { value: amount }),
    })
    .on('transactionHash', (tx: any) => {
      return tx.transactionHash
    })
}

export const canceledSellNft = async (
  account: string,
  mollectorMarketplaceContract: Contract,
  nftAddress: string,
  tokenId: number,
) => {
  return mollectorMarketplaceContract.methods
    .cancelAuction(nftAddress, tokenId)
    .send({
      from: account,
    })
    .on('transactionHash', (tx: any) => {
      return tx.transactionHash
    })
}

export const depositNft = async (
  depositContract: Contract,
  tokenIds: string[],
  account: string,
  nftAddress: string,
  accountName: string,
) => {
  const data = tokenIds.map((id) => {
    return [nftAddress, accountName, '0', id, true]
  })

  return depositContract.methods
    .depositNft(data)
    .send({
      from: account,
    })
    .on('transactionHash', (tx: any) => {
      return tx.transactionHash
    })
}

export const depositToken = async (
  depositContract: Contract,
  amount: string,
  account: string,
  tokenAddress: string,
  accountName: string,
) => {
  const data = [tokenAddress, accountName, amount]
  const isNativeToken = tokenAddress === ZERO_ADDRESS
  return depositContract.methods
    .depositToken(data)
    .send({
      from: account,
      ...(isNativeToken && { value: amount }),
    })
    .on('transactionHash', (tx: any) => {
      return tx.transactionHash
    })
}
export const withdrawNft = async (
  account: string,
  depositContract: Contract,
  proofs: any[],
  nftData: IWithdrawNFTInfo[],
) => {
  const data = nftData.map(({ nftAddress, ownerAccount, dna, tokenId, upgradeable }) => {
    return [nftAddress, ownerAccount, dna, tokenId, upgradeable]
  })
  return depositContract.methods
    .withdrawNft(data, proofs)
    .send({
      from: account,
    })
    .on('transactionHash', (tx: any) => {
      return tx.transactionHash
    })
}

export const withdrawToken = async (
  depositContract: Contract,
  tokenAddress: string,
  ownerAccount: string,
  account: string,
  amount: string,
  proofs: any[],
) => {
  const data = [tokenAddress, ownerAccount, amount]
  return depositContract.methods
    .withdrawToken(data, proofs)
    .send({
      from: account,
    })
    .on('transactionHash', (tx: any) => {
      return tx.transactionHash
    })
}
