import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { ZERO_ADDRESS } from '~/configurations/constants'
import { buyNft } from '~/utils/callHelpers'

import { useMarketplaceContract } from './useContract'

const useBuyNft = (marketContractAddress: string, tokenAddress: string) => {
  const mollectorMarketplaceContract = useMarketplaceContract(marketContractAddress)
  const { account } = useWeb3React()
  const handleBuyNft = useCallback(
    async (tokenId: number, amount: string, payToken: string) => {
      const isNativeToken = payToken === ZERO_ADDRESS
      const tx = await buyNft(
        mollectorMarketplaceContract!,
        tokenAddress,
        tokenId,
        payToken,
        account!,
        amount,
        isNativeToken,
      )

      return tx
    },
    [mollectorMarketplaceContract, account],
  )

  return { onBuyNft: handleBuyNft }
}

export default useBuyNft
