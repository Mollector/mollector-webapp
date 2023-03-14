import { useQuery } from 'react-query'

import { ServerStateKeysEnum } from '~/ServerStateKey'
import { useApi } from '~/widgets/MainApp/api'

export interface IPlayerBalanceResponse {
  Cyrstal: number
  Energy: number
  Molecule: number
  Radiation: number
  playerId: string
  energyRechargedAt: number
}

const useGetPlayerBalance = () => {
  const { getPlayerBalance } = useApi()

  return useQuery([ServerStateKeysEnum.PlayerBalance], () => getPlayerBalance(), {
    cacheTime: 0,
  })
}

export default useGetPlayerBalance
