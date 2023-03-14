import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { buyPack } from '~/utils/callHelpers'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'

import { useBuyPackContract } from './useContract'

const useBuyPacks = () => {
  const { account } = useWeb3React()
  const { mollectorPackAddress } = useMarketplaceContextHelper()
  const buyPackContract = useBuyPackContract(mollectorPackAddress!)
  const handleBuyCyblockPack = useCallback(
    async (quantity: string, amount: string, packType: string, payToken: string) => {
      if (buyPackContract) {
        const txHash = await buyPack(buyPackContract, quantity, amount, account, packType, payToken)
        return txHash
      }
    },
    [account, buyPackContract],
  )

  return { onBuyPack: handleBuyCyblockPack }
}

export default useBuyPacks
