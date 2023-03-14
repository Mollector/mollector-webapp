import { useQuery } from 'react-query'

import { useWeb3React } from '@web3-react/core'

import { ServerStateKeysEnum } from '~/ServerStateKey'
import { useApi } from '~/widgets/MainApp/api'

const useGetNewTokenIds = (tokenIds: string[]) => {
  const { getDetailNewTokenIds } = useApi()
  const { chainId } = useWeb3React()

  return useQuery(
    [ServerStateKeysEnum.NewTokenIds, tokenIds, chainId],
    () => getDetailNewTokenIds(tokenIds, chainId!),
    {
      cacheTime: 0,
    },
  )
}

export default useGetNewTokenIds
