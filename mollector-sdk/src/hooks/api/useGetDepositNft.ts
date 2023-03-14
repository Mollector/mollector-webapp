import { useInfiniteQuery } from 'react-query'

import { ServerStateKeysEnum } from '~/ServerStateKey'
import { useApi } from '~/widgets/MainApp/api'

import { IFilters } from './../../widgets/MainApp/components/Inventory/Request/types'

const useGetDepositNft = (filters: IFilters) => {
  const { getDepositNFT } = useApi()
  return useInfiniteQuery(
    [ServerStateKeysEnum.DepositNFT, filters],
    ({ pageParam = 0 }) => getDepositNFT(filters, pageParam),
    {
      cacheTime: 0,
      getNextPageParam: (pageParam) => {
        if (pageParam.nextPage !== undefined) {
          return pageParam.nextPage + 1
        }

        return undefined
      },
    },
  )
}

export default useGetDepositNft
