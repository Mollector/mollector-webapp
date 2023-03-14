import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import useCanceledSellNft from '../useCanceledSellNft'

export interface ICancelAuction {
  tokenId: number
  nftAddress: string
}

const useCancelAuctionMutation = () => {
  const { onCanceledSell } = useCanceledSellNft()
  return useMutation(
    ({ tokenId, nftAddress }: ICancelAuction) => {
      return onCanceledSell(nftAddress, tokenId)
    },
    {
      onSuccess: () => {
        toast.success('Successfully cancel auction')
      },
      onError: () => {
        toast.error('Fail to cancel auction')
      },
    },
  )
}

export default useCancelAuctionMutation
