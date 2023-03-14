import { useQuery } from 'react-query'
import { Contract } from 'web3-eth-contract'

import { useWeb3React } from '@web3-react/core'

import { ServerStateKeysEnum } from '~/ServerStateKey'

import useIsApproved from '../useIsApproved'

const useGetApprovedStatus = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWeb3React()
  const fetchAllowanceData = useIsApproved(tokenContract, spenderAddress, account)
  return useQuery(ServerStateKeysEnum.IsApproved, () => fetchAllowanceData(), {
    enabled: !!account && !!tokenContract,
    cacheTime: 0,
    refetchInterval: 2500,
  })
}

export default useGetApprovedStatus
