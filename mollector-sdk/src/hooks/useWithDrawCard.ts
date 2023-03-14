import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { withdrawNft } from '~/utils/callHelpers'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'

import { IWithdrawNFTInfo } from './mutations/useWithdrawCardMutation'
import { useDepositCardContract } from './useContract'

const useWithDrawCard = () => {
  const { account, chainId } = useWeb3React()
  const { mollectorEscrowAddress } = useMarketplaceContextHelper()
  const depositContract = useDepositCardContract(mollectorEscrowAddress!)
  const handleWithDrawCard = useCallback(
    async (proofs: any[], nftData: IWithdrawNFTInfo[]) => {
      const tx = await withdrawNft(account!, depositContract!, proofs, nftData)
      return tx
    },
    [account, depositContract],
  )

  return { onWithdrawCard: handleWithDrawCard }
}

export default useWithDrawCard
