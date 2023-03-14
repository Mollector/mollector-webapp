import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import useWithdrawToken from '../useWithdrawToken'

const useWithdrawTokenMutation = () => {
  const { onWithdrawToken } = useWithdrawToken()

  return useMutation(
    ({
      tokenAddress,
      ownerAccount,
      proofs,
      amount,
    }: {
      tokenAddress: string
      ownerAccount: string
      proofs: any[]
      amount: string
    }) => {
      return onWithdrawToken(proofs, tokenAddress, ownerAccount, amount)
    },
    {
      onSuccess: () => {
        toast.success('Successfully withdraw token')
      },
      onError: () => {
        toast.error('Fail to withdraw token')
      },
    },
  )
}

export default useWithdrawTokenMutation
