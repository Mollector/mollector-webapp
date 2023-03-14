import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { DEPOSIT } from '~/configurations/constants'
import { depositNft, depositToken } from '~/utils/callHelpers'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'

import { useDepositCardContract } from './useContract'

export interface IDeposit {
  tokenIds: string[] | null
  amount: string | null
  contractAddress: string
  accountName: string
}

const useDepositCard = (type: typeof DEPOSIT[keyof typeof DEPOSIT]) => {
  const { account } = useWeb3React()
  const { mollectorEscrowAddress } = useMarketplaceContextHelper()
  const depositCardContract = useDepositCardContract(mollectorEscrowAddress!)
  const handleDeposit = useCallback(
    async ({ tokenIds, amount, contractAddress, accountName }: IDeposit) => {
      if (type === DEPOSIT.NFT && account && tokenIds) {
        const txHash = await depositNft(depositCardContract!, tokenIds, account, contractAddress, accountName)
        return txHash
      }

      if (type === DEPOSIT.TOKEN && account && amount) {
        const txHash = await depositToken(depositCardContract!, amount, account, contractAddress, accountName)
        return txHash
      }
    },
    [account, depositCardContract, type],
  )

  return { onHandleDeposit: handleDeposit }
}

export default useDepositCard
