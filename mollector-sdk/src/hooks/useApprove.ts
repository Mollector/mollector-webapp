import { useCallback } from 'react'
import { BigNumber } from 'ethers'
import { Contract } from 'web3-eth-contract'

import { useWeb3React } from '@web3-react/core'

import { approveContract } from '~/utils/callHelpers'

export const useApprove = (contract: Contract, spenderAddress: string, amount: BigNumber) => {
  const { account } = useWeb3React()
  const handleApprove = useCallback(async () => {
    const tx = await approveContract(contract, spenderAddress, account, amount)
    return tx
  }, [account, contract, spenderAddress])

  return { onApprove: handleApprove }
}
