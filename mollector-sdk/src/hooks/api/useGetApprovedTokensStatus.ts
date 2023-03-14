import { useQuery } from 'react-query'
import { Contract } from 'web3-eth-contract'

import { useWeb3React } from '@web3-react/core'

import { ServerStateKeysEnum } from '~/ServerStateKey'

import useIsApprovedTokens from '../useIsApprovedTokens'

const useGetApprovedTokensStatus = (nftContract: Contract, spenderAddress: string) => {
  const { account } = useWeb3React()
  const { checkIsApprovedSpendingTokenId } = useIsApprovedTokens(nftContract, spenderAddress, account)

  return useQuery(ServerStateKeysEnum.IsApprovedTokens, () => checkIsApprovedSpendingTokenId(), {
    enabled: !!account,
    cacheTime: 0,
    refetchInterval: 2500,
  })
}

export default useGetApprovedTokensStatus
