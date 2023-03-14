import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'

import useBuyNft from '../useBuyNft'

export interface IBuyNft {
  tokenId: number
  amount: string
  payToken: string
}

const useBuyNftMutation = (tokenAddress: string) => {
  const { marketplaceAddress } = useMarketplaceContextHelper()
  const { onBuyNft } = useBuyNft(marketplaceAddress!, tokenAddress)
  return useMutation(
    ({ tokenId, amount, payToken }: IBuyNft) => {
      return onBuyNft(tokenId, amount, payToken)
    },
    {
      onSuccess: () => {
        toast.success('Successfully buy card')
      },
      onError: () => {
        toast.error('Fail to buy card')
      },
    },
  )
}

export default useBuyNftMutation
