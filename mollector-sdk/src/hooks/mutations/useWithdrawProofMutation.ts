import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { useWeb3React } from '@web3-react/core'

import { useApi } from '~/widgets/MainApp/api'

export interface IWithDrawProof {
  ownerAddress: string
  ownerAccount: string
  tokenAddress: string
  tokenId?: number
  dna?: number
  amount?: string
}

export enum PROOF_TYPE {
  NFT = 'NFT',
  TOKEN = 'TOKEN',
}

const useWithdrawProofMutation = (type: keyof typeof PROOF_TYPE) => {
  const { withdrawNft, withdrawToken } = useApi()
  const { chainId } = useWeb3React()
  if (type === PROOF_TYPE.NFT) {
    return useMutation(
      (nfts: IWithDrawProof[]) => {
        return withdrawNft(nfts, chainId!)
      },
      {
        onError: () => {
          toast.error('Fail withdraw card')
        },
      },
    )
  } else {
    return useMutation(
      (tokens: IWithDrawProof[]) => {
        return withdrawToken(tokens, chainId!)
      },
      {
        onError: () => {
          toast.error('Fail to withdraw token')
        },
      },
    )
  }
}

export default useWithdrawProofMutation
