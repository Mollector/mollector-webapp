import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'

import { useWeb3React } from '@web3-react/core'

import { sellNft } from '~/utils/callHelpers'

const useSellNft = (marketplaceContract?: Contract | null) => {
  const { account } = useWeb3React()
  const handleSellNft = useCallback(
    async (
      nftAddress: string,
      tokenId: string,
      startingPrice: string,
      endingPrice: string,
      payToken: string,
      duration: string,
    ) => {
      if (marketplaceContract) {
        const tx = await sellNft(
          account!,
          marketplaceContract,
          nftAddress,
          tokenId,
          startingPrice,
          endingPrice,
          duration,
          payToken,
        )
        return tx
      }
    },
    [account, marketplaceContract],
  )

  return { onSell: handleSellNft }
}

export default useSellNft
