import { useContext } from 'react'
import { useQuery } from 'react-query'

import { ServerStateKeysEnum } from '~/ServerStateKey'
import { useApi } from '~/widgets/MainApp/api'
import { MarketplaceContext } from '~/widgets/MainApp/context/MarketplaceContext'
import { setMarketplaceConfig } from '~/widgets/MainApp/store/reducer'

const useGetConfig = (account: string | null | undefined) => {
  const { getMarketplaceConfig } = useApi()
  const { dispatch } = useContext(MarketplaceContext)

  const { data, isFetching, isError } = useQuery(
    [ServerStateKeysEnum.MarketPlaceConfig, account],
    () => getMarketplaceConfig(),
    {
      enabled: !!account,
      cacheTime: 0,
    },
  )

  if (data) {
    dispatch(setMarketplaceConfig(data))
  }

  return isFetching || isError
}

export default useGetConfig
