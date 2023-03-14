import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { withdrawToken } from '~/utils/callHelpers'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'

import { useDepositCardContract } from './useContract'

const useWithdrawToken = () => {
  const { account, chainId } = useWeb3React()
  const { mollectorEscrowAddress } = useMarketplaceContextHelper()
  const depositContract = useDepositCardContract(mollectorEscrowAddress!)
  const handleWithdrawToken = useCallback(
    async (proofs: any[], tokenAddress: string, ownerAccount: string, amount: string) => {
      const tx = await withdrawToken(depositContract!, tokenAddress, ownerAccount, account!, amount, proofs)
      return tx
    },
    [account, depositContract],
  )

  return { onWithdrawToken: handleWithdrawToken }
}

export default useWithdrawToken
