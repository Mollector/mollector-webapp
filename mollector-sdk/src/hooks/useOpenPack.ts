import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { useApi } from '~/widgets/MainApp/api'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'

import { useWeb3 } from '..'

import { useBuyPackContract } from './useContract'

const useOpenPack = () => {
  const { account, chainId } = useWeb3React()
  const web3 = useWeb3()
  const { mollectorPackAddress } = useMarketplaceContextHelper()
  const { getOpenPackEncodedData } = useApi()
  const buyPackContract = useBuyPackContract(mollectorPackAddress!)
  const handleOpenPack = useCallback(
    async (tokenIds: string[]) => {
      if (buyPackContract && account) {
        const { contractAddress, data } = await getOpenPackEncodedData(tokenIds, account!, chainId!)
        const paramsForOpenPack = {
          from: account,
          to: contractAddress,
          value: 0,
          data: data,
        }
        const txHash = await web3.eth.sendTransaction(paramsForOpenPack)
        return txHash
      }
    },
    [account, buyPackContract],
  )

  return { onOpenPack: handleOpenPack }
}

export default useOpenPack
