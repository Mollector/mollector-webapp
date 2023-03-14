import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { DEPOSIT } from '~/configurations/constants'

import useDepositCard, { IDeposit } from '../useDepositCard'

const useDepositCardMutation = (type: typeof DEPOSIT[keyof typeof DEPOSIT]) => {
  const { onHandleDeposit } = useDepositCard(type)
  return useMutation(
    ({ tokenIds, amount, contractAddress, accountName }: IDeposit) => {
      return onHandleDeposit({
        tokenIds,
        amount,
        contractAddress,
        accountName,
      })
    },
    {
      onSuccess: () => {
        toast.success('Successfully deposit token')
      },
      onError: () => {
        toast.error('Fail to deposit token')
      },
    },
  )
}

export default useDepositCardMutation
