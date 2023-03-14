import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { Contract } from 'web3-eth-contract'

import useApproveTokens from '../useApproveTokens'

const useApproveTokenMutation = (payTokenContract: Contract, spenderAddress: string) => {
  const { onApprove } = useApproveTokens(spenderAddress, payTokenContract)
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

export default useApproveTokenMutation
