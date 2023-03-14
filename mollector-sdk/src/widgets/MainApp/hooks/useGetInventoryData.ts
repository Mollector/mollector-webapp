import { useEffect, useState } from 'react'

import { useWeb3React } from '@web3-react/core'

import { useUtilContract } from '~/hooks/useContract'

import { Handler } from '../../..'
import useMarketplaceContextHelper from '../context/useMarketplaceContextHelper'

const DEFAULT_DATA = {
  commonPackageData: [],
  rarePackageData: [],
  epicPackageData: [],
}

export interface IPackFromChain {
  packType: string
  tokenId: string
}

export interface InventoryDataType {
  commonPackageData: IPackFromChain[]
  rarePackageData: IPackFromChain[]
  epicPackageData: IPackFromChain[]
}

const filterPackageIndexes = (packs: any[]): IPackFromChain[] => {
  const packList: IPackFromChain[] = []
  if (packs && packs.length > 0) {
    // eslint-disable-next-line array-callback-return
    packs.map((pack) => {
      packList.push({
        packType: pack[1],
        tokenId: pack[0],
      })
    })

    return packList
  }

  return []
}

const useGetInventoryData = (
  filters: any,
): [data: InventoryDataType, isLoading: boolean, totalPacks: number, onHandleRefetchingInventory: Handler] => {
  const { account, chainId } = useWeb3React()
  const [data, setData] = useState<InventoryDataType>(DEFAULT_DATA)
  const [refetching, setRefetching] = useState(0)
  const [totalPacks, setTotalPacks] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { limit, from } = filters
  const { mollectorUtilsAddress, mollectorPackAddress } = useMarketplaceContextHelper()
  const cyblocUtilContract = useUtilContract(mollectorUtilsAddress!)
  const getNumberOfUserPackage = async (): Promise<IPackFromChain[] | []> => {
    try {
      if (cyblocUtilContract) {
        const packDataFromContract = await cyblocUtilContract.methods
          .getPackOf(mollectorPackAddress, account, limit, from)
          .call()
        const { total, packs } = packDataFromContract
        setTotalPacks(Number(total))
        const mappedResult = filterPackageIndexes(packs)
        return mappedResult
      }

      return []
    } catch (error) {
      return []
    }
  }

  const onHandleRefetchingInventory = () => {
    setRefetching(refetching + 1)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const packsData = await getNumberOfUserPackage()
        const commonPackageData: IPackFromChain[] = []
        const rarePackageData: IPackFromChain[] = []
        const epicPackageData: IPackFromChain[] = []
        packsData.forEach((pack) => {
          if (pack.packType === '1') {
            commonPackageData.push(pack)
          }

          if (pack.packType === '2') {
            rarePackageData.push(pack)
          }

          if (pack.packType === '3') {
            epicPackageData.push(pack)
          }
        })
        setData({
          ...data,
          commonPackageData,
          rarePackageData,
          epicPackageData,
        })
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
    if (account) {
      fetchData()
    }
  }, [account, from, refetching])

  return [data, isLoading, totalPacks, onHandleRefetchingInventory]
}

export default useGetInventoryData
