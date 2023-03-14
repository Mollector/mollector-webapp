import get from 'lodash/get'

import configurations from '~/configurations'
import { IPlayerBalanceResponse } from '~/hooks/api/useGetPlayerBalance'
import { IAuthenticatedInfo } from '~/hooks/mutations/useSignInMutation'
import { IWithDrawProof } from '~/hooks/mutations/useWithdrawProofMutation'

import { IActivity } from '../components/Inventory/Activity'
import { IChainConfig, IFilters } from '../context/MarketplaceContext'
import { ICard, IIngameCard, IMarketplaceCard, IOpenPackEncodedData, IPack } from '../types'

import { IFilters as IFiltersInGameAssets } from './../components/Inventory/Request/types'
import Http from './httpUtils'

export const limitItems = 36

export const limitItemsTable = 10

export const LIMIT_CARD_PER_PAGE = 36
export const LIMIT_PACK_PER_PAGE = 36
export const LIMIT_INGAME_CARD_PER_PAGE = 36

const NETWORK_MAP = {
  88: 'TomoChain',
  56: 'BinanceSmartChain',
  97: 'BSCTEST',
}

const getNetworkName = (chainId: number): typeof NETWORK_MAP[keyof typeof NETWORK_MAP] => {
  if (!chainId || !NETWORK_MAP[chainId as keyof typeof NETWORK_MAP]) {
    return 'BSCTEST'
  }

  return NETWORK_MAP[chainId as keyof typeof NETWORK_MAP]
}

export const useApi = () => {
  const getDetailNewTokenIds = async (
    tokenIds: string[],
    chainId: number,
  ): Promise<{
    cards: ICard[]
    total: number
  }> => {
    const { data } = await Http.get(`${configurations.API_URL}/Crawler/${getNetworkName(chainId)}/Card?ids=${tokenIds}`)
    return data.data
  }

  const getCardList = async (
    address: string,
    currPage: number,
    chainId: number,
  ): Promise<{
    cards: ICard[]
    total: number
  }> => {
    const { data } = await Http.get(`${configurations.API_URL}/Crawler/${getNetworkName(chainId)}/Card`, {
      params: {
        limit: LIMIT_CARD_PER_PAGE,
        from: (currPage - 1) * LIMIT_CARD_PER_PAGE,
        address,
      },
    })
    return data.data
  }

  const getPackList = async (
    address: string,
    currPage: number,
    chainId: number,
  ): Promise<{
    packs: IPack[]
    total: number
  }> => {
    const { data } = await Http.get(`${configurations.API_URL}/Crawler/${getNetworkName(chainId)}/Pack`, {
      params: {
        limit: LIMIT_PACK_PER_PAGE,
        from: (currPage - 1) * LIMIT_PACK_PER_PAGE,
        address,
      },
    })
    return get(data, 'data', {
      packs: [],
      total: 0,
    })
  }

  const getMarketplaceData = async (
    filters: IFilters,
    chainId: number,
  ): Promise<{ autions: IMarketplaceCard[]; total: number }> => {
    const { type, rarity, tokenId, currPage, sort, sortKey, star } = filters
    const { data } = await Http.get(`${configurations.API_URL}/MarketPlace/${getNetworkName(chainId)}`, {
      params: {
        type,
        rarity,
        tokenId,
        limit: limitItems,
        from: (currPage - 1) * limitItems,
        sort,
        sortKey,
        cardLevel: star,
      },
    })
    return data.data.body
  }

  const getOpenPackEncodedData = async (
    packIds: string[],
    address: string,
    chainId: number,
  ): Promise<IOpenPackEncodedData> => {
    const { data = {} } = await Http.post(
      `${configurations.API_URL}/ContractDataEncode/${getNetworkName(chainId)}/OpenPack`,
      {
        owner: address,
        packIds,
      },
    )

    return data.data
  }

  const getMarketplaceConfig = async (): Promise<IChainConfig> => {
    const { data = {} } = await Http.get(`${configurations.API_URL}/Contracts`)
    return data.data
  }

  const getActivityData = async (
    address: string,
    currentPage: number,
    chainId: number,
  ): Promise<{ activities: IActivity[]; total: number }> => {
    const { data = {} } = await Http.get(`${configurations.API_URL}/Activity/${getNetworkName(chainId)}`, {
      params: {
        address,
        limit: limitItemsTable,
        from: (currentPage - 1) * limitItemsTable,
      },
    })
    return data.data
  }

  const getDepositNFT = async (
    filters: IFiltersInGameAssets,
    pageParam: number,
  ): Promise<{
    data: IIngameCard[]
    nextPage: number | undefined
  }> => {
    const { type, rarity, tokenId, sort, sortKey, star } = filters
    const { data } = await Http.post(`${configurations.API_URL}/PlayerCards`, {
      query: {
        limit: LIMIT_INGAME_CARD_PER_PAGE,
        skip: pageParam * LIMIT_INGAME_CARD_PER_PAGE,
        tokenIds: tokenId && [tokenId],
        type,
        level: star,
        rarity,
        sort,
      },
    })

    if (data.data.length !== LIMIT_CARD_PER_PAGE) {
      return {
        data: data.data,
        nextPage: undefined,
      }
    }

    return {
      data: data.data,
      nextPage: pageParam,
    }
  }

  const getPlayerBalance = async (): Promise<IPlayerBalanceResponse> => {
    const { data } = await Http.post(`${configurations.API_URL}/PlayerBalance`)
    return data.data
  }

  const withdrawNft = async (nfts: IWithDrawProof[], chainId: number): Promise<any> => {
    const { data } = await Http.post(`${configurations.API_URL}/Escrow/${getNetworkName(chainId)}/WithdrawNft`, {
      nfts,
    })

    return data.data
  }

  const withdrawToken = async (tokens: IWithDrawProof[], chainId: number): Promise<any> => {
    const { ownerAccount, ownerAddress, tokenAddress, amount } = tokens[0]
    const { data } = await Http.post(`${configurations.API_URL}/Escrow/${getNetworkName(chainId)}/WithdrawToken`, {
      params: {
        ownerAccount,
        ownerAddress,
        tokenAddress,
        amount,
      },
    })

    return data.data
  }

  const signIn = async (email: string, password: string): Promise<IAuthenticatedInfo> => {
    const { data } = await Http.post(`${configurations.API_URL}/Auth/Login`, {
      query: {
        email,
        password,
      },
    })

    return data.data
  }

  return {
    getDetailNewTokenIds,
    getCardList,
    getMarketplaceData,
    getOpenPackEncodedData,
    getMarketplaceConfig,
    getActivityData,
    getPackList,
    getDepositNFT,
    getPlayerBalance,
    signIn,
    withdrawNft,
    withdrawToken,
  }
}
