import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import useWithDrawCard from '../useWithDrawCard'

export interface IWithdrawNFTInfo {
  nftAddress: string
  ownerAccount: string
  dna: number
  tokenId: number
  upgradeable: boolean
}
export interface IWithdrawNftData {
  proofs: any[]
  nftData: IWithdrawNFTInfo[]
}

const useWithdrawCardMutation = () => {
  const { onWithdrawCard } = useWithDrawCard()

  return useMutation(
    ({ nftData, proofs }: IWithdrawNftData) => {
      return onWithdrawCard(proofs, nftData)
    },
    {
      onSuccess: () => {
        toast.success('Successfully withdraw card(s)')
      },
      onError: () => {
        toast.error('Fail to withdraw card(s)')
      },
    },
  )
}

export default useWithdrawCardMutation
