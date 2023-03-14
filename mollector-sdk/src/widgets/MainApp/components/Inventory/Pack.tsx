import React, { useContext, useState } from 'react'
import find from 'lodash/find'
import get from 'lodash/get'
import { toast } from 'react-toastify'

import { useWeb3React } from '@web3-react/core'

import { scales } from '~/components/Button/types'
import { Flex } from '~/components/Flex'
import { Grid } from '~/components/Grid'
import { LoadingScreen } from '~/components/LoadingScreen'
import Pagination from '~/components/Pagination'
import useGetPackList from '~/hooks/api/useGetPackList'
import useOpenPackMutation from '~/hooks/mutations/useOpenPackMutation'
import useMediaQuery from '~/hooks/useMediaQuery'
import ConfirmModal from '~/widgets/Modal/ConfirmModal'
import PackDetailOpenModal from '~/widgets/Modal/PackDetailOpenModal'
import PackRevealModal from '~/widgets/Modal/PackRevealModal'
import { useWeb3 } from '~/widgets/Web3Provider'

import { LIMIT_PACK_PER_PAGE } from '../../api'
import { MarketplaceContext } from '../../context/MarketplaceContext'
import useMarketplaceContextHelper from '../../context/useMarketplaceContextHelper'
import { setNewPackIds } from '../../store/reducer'
import { IPack } from '../../types'

import PackBase from './components/PackBase'
import { BoxWrapper, DepositButton, SelectButton, UnselectButton } from './styles'

const Pack = ({ setTab }: { setTab: (tab: number) => void }) => {
  const [currPage, setCurrPage] = useState(1)
  const { chainId, account } = useWeb3React()
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenPackRevealModal, setIsOpenPackRevealModal] = useState(false)
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [currentSelectedChest, setCurrentSelectedChest] = useState<IPack>({
    owner: '',
    packType: 0,
    tokenId: 0,
    network: '',
    contractAddress: '',
  })
  const isMobile = useMediaQuery('(max-width: 576px)')
  const [selectedPackage, setSelectedPackage] = useState<IPack[]>([])
  const { dispatch } = useContext(MarketplaceContext)

  const web3 = useWeb3()
  const {
    data: packData = {
      packs: [],
      total: 0,
    },
    isLoading,
    refetch,
  } = useGetPackList(account!, currPage, chainId!)
  const { mutateAsync: onHandleOpenPack, isLoading: isLoadingOpenPack } = useOpenPackMutation()
  const { mollectorCardAddress } = useMarketplaceContextHelper()
  const { packs, total: totalPacks } = packData
  const [isShowDetailModal, setIsShowDetailModal] = useState(false)
  const [packOpenInfo, setOpenPackInfo] = useState<IPack[]>([])

  const onHandleNavigateAfterOpen = async (txHash: string, packsInfo: IPack[]) => {
    const txInfo = await web3.eth.getTransactionReceipt(txHash)
    const newTokenIds = get(txInfo, 'logs', [])
      .filter((log: any) => log?.address && String(log.address).toLowerCase() === mollectorCardAddress?.toLowerCase())
      .map((log: any) => log.topics)
      .filter((topics: any) => topics.length === 3)
      .map((methodsInfo: any) => {
        const tokenId = get(methodsInfo, '1', 0)
        return web3.utils.hexToNumberString(tokenId)
      })
    refetch()
    dispatch(setNewPackIds(newTokenIds))
    setOpenPackInfo(packsInfo)
    setIsOpenPackRevealModal(true)
  }

  const onHandleSelectPackage = (packInfo: IPack) => {
    if (find(selectedPackage, (pInfo) => pInfo.tokenId === packInfo.tokenId)) {
      const newSelectedPackage = selectedPackage.filter((pInfo) => pInfo.tokenId !== packInfo.tokenId)
      setSelectedPackage(newSelectedPackage)
    } else {
      setSelectedPackage([...selectedPackage, packInfo])
    }
  }

  const onHandleMultiplePacks = async (packsInfo: IPack[]) => {
    try {
      if (packsInfo.length !== 0) {
        const packIds = packsInfo.map((packInfo) => String(packInfo.tokenId))
        const tx = await onHandleOpenPack(packIds)
        await onHandleNavigateAfterOpen(tx!.transactionHash, packsInfo)
        toast.success('Successfully open pack(s)')
      }
    } catch (error) {
      toast.error('Fail to open pack(s)')
    }
  }

  return (
    <BoxWrapper>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Flex justifyContent="flex-end" width="100%" mb="20px">
            {isSelectionMode ? (
              <>
                <DepositButton
                  scale={isMobile ? scales.SM : scales.MD}
                  mr="10px"
                  onClick={() => setIsOpenConfirmModal(true)}
                  disabled={selectedPackage.length === 0}
                  isLoading={isLoadingOpenPack}
                >
                  Open {selectedPackage.length} pack(s)
                </DepositButton>
                <UnselectButton
                  scale={isMobile ? scales.SM : scales.MD}
                  onClick={() => {
                    setIsSelectionMode(false)
                    setSelectedPackage([])
                  }}
                >
                  Unselect
                </UnselectButton>
              </>
            ) : (
              packs.length !== 0 && (
                <SelectButton scale={isMobile ? scales.SM : scales.MD} onClick={() => setIsSelectionMode(true)}>
                  Select
                </SelectButton>
              )
            )}
          </Flex>
          <Grid
            items={packs}
            settings={{
              gridGap: 40,
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gridTemplateRows: 'auto',
            }}
          >
            {packs.map((packInfo) => {
              return (
                <PackBase
                  onSelect={() => onHandleSelectPackage(packInfo)}
                  selectedPackage={selectedPackage}
                  showPackDetailModal={() => {
                    setIsShowDetailModal(true)
                    setCurrentSelectedChest(packInfo)
                  }}
                  isSelectionMode={isSelectionMode}
                  packInfo={packInfo}
                />
              )
            })}
          </Grid>
          <Pagination
            currentPage={currPage}
            totalCount={totalPacks}
            pageSize={LIMIT_PACK_PER_PAGE}
            onPageChange={(page: number) => setCurrPage(page)}
          />
          <PackDetailOpenModal
            isOpen={isShowDetailModal}
            packInfo={currentSelectedChest}
            isLoadingOpenPack={isLoadingOpenPack}
            onHandleClose={() => {
              setIsShowDetailModal(false)
            }}
            onHandleConfirmOpenPack={async () => {
              await onHandleMultiplePacks([currentSelectedChest])
              setIsShowDetailModal(false)
            }}
          />
          <PackRevealModal
            isOpen={isOpenPackRevealModal}
            onHandleClose={() => setIsOpenPackRevealModal(false)}
            onChangeTab={setTab}
            packOpenInfo={packOpenInfo}
          />
          <ConfirmModal
            isOpen={isOpenConfirmModal}
            onHandleClose={() => setIsOpenConfirmModal(false)}
            onHandleConfirm={() => onHandleMultiplePacks(selectedPackage)}
            confirmMessage={`Are you sure to open ${selectedPackage.length} selected chest(s)?`}
          />
        </>
      )}
    </BoxWrapper>
  )
}

export default Pack
