import { ethers } from 'ethers'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { Contract } from 'web3-eth-contract'

import { useApprove } from '../useApprove'

const useApproveMutation = (
  payTokenContract: Contract,
  spenderAddress: string,
  amount = ethers.constants.MaxUint256,
) => {
  const { onApprove } = useApprove(payTokenContract!, spenderAddress, amount)
  return useMutation(
    () => {
      return onApprove()
    },
    {
      onSuccess: () => {
        toast.success('Successfully approve')
      },
      onError: () => {
        toast.error('Fail to approve')
      },
    },
  )
}

export default useApproveMutation
