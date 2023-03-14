import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { canceledSellNft } from '~/utils/callHelpers'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'

import { useMarketplaceContract } from './useContract'

const useCanceledSellNft = () => {
  const { account } = useWeb3React()
  const { marketplaceAddress } = useMarketplaceContextHelper()
  const marketplaceContract = useMarketplaceContract(marketplaceAddress!)
  const handleCanceledSellNft = useCallback(
    async (nftAddress: string, tokenId: number) => {
      const tx = await canceledSellNft(account!, marketplaceContract!, nftAddress, tokenId)
      return tx
    },
    [account, marketplaceContract],
  )

  return { onCanceledSell: handleCanceledSellNft }
}

export default useCanceledSellNft
