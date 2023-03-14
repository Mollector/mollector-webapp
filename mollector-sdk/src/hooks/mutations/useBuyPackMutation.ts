import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { PACK_TYPE } from '~/widgets/MainApp/components/Pack/type'

import useBuyPacks from '../useBuyPacks'

export interface IBuyPack {
  quantity: string
  amount: string
  packType: string
  payToken: string
}

const useBuyPackMutation = () => {
  const { onBuyPack } = useBuyPacks()
  return useMutation(
    ({ quantity, amount, packType, payToken }: IBuyPack) => {
      return onBuyPack(quantity, amount, packType, payToken)
    },
    {
      onSuccess: () => {
        toast.success('Successfully buy pack')
      },
      onError: () => {
        toast.error('Fail to buy pack')
      },
    },
  )
}

export default useBuyPackMutation
