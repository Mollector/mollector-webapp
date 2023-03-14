import { useQuery } from 'react-query'

import { useWeb3React } from '@web3-react/core'

import { ServerStateKeysEnum } from '~/ServerStateKey'
import { useApi } from '~/widgets/MainApp/api'
import { IFilters } from '~/widgets/MainApp/context/MarketplaceContext'

const useGetMarketplaceData = (filters: IFilters) => {
  const { getMarketplaceData } = useApi()
  const { chainId } = useWeb3React()
  return useQuery([ServerStateKeysEnum.MarketPlace, filters, chainId], () => getMarketplaceData(filters, chainId!), {
    enabled: true,
    cacheTime: 0,
  })
}

export default useGetMarketplaceData
