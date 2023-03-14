import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'

import { useWeb3React } from '@web3-react/core'

import { approveNftTokens } from '~/utils/callHelpers'

const useApproveTokens = (spenderAddress: string, tokenContract: Contract) => {
  const { account } = useWeb3React()
  const handleApproveTokens = useCallback(async () => {
    const tx = await approveNftTokens(spenderAddress, tokenContract, account!)

    return tx
  }, [account, tokenContract, spenderAddress])

  return { onApprove: handleApproveTokens }
}

export default useApproveTokens
