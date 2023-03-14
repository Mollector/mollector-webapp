import { useQuery } from 'react-query'

import { ServerStateKeysEnum } from '~/ServerStateKey'
import { useApi } from '~/widgets/MainApp/api'

const useGetPackList = (address: string, currentPage: number, chainId: number) => {
  const { getPackList } = useApi()

  return useQuery(
    [ServerStateKeysEnum.PackList, address, currentPage, chainId],
    () => getPackList(address, currentPage, chainId),
    {
      enabled: !!address,
      cacheTime: 0,
    },
  )
}

export default useGetPackList
