import { useQuery } from 'react-query'

import { ServerStateKeysEnum } from '~/ServerStateKey'
import { useApi } from '~/widgets/MainApp/api'

const useGetCardList = (address: string, currentPage: number, chainId: number) => {
  const { getCardList } = useApi()

  return useQuery(
    [ServerStateKeysEnum.CardList, address, currentPage, chainId],
    () => getCardList(address, currentPage, chainId),
    {
      enabled: !!address,
      cacheTime: 0,
    },
  )
}

export default useGetCardList
