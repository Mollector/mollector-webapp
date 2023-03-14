import { useQuery } from 'react-query'

import { useWeb3React } from '@web3-react/core'

import { ServerStateKeysEnum } from '~/ServerStateKey'
import { useApi } from '~/widgets/MainApp/api'

const useGetActivity = (address: string, currentPage: number) => {
  const { getActivityData } = useApi()
  const { chainId } = useWeb3React()

  return useQuery(
    [ServerStateKeysEnum.Activity, address, currentPage, chainId],
    () => getActivityData(address, currentPage, chainId!),
    {
      enabled: true,
      cacheTime: 0,
    },
  )
}

export default useGetActivity
