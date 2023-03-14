import React, { Dispatch, useMemo, useState } from 'react'
import get from 'lodash/get'

import { useWeb3React } from '@web3-react/core'

import { Button } from '~/components/Button'
import { scales } from '~/components/Button/types'
import { Flex } from '~/components/Flex'
import { Grid } from '~/components/Grid'
import { LoadingScreen } from '~/components/LoadingScreen'
import useGetDepositNft from '~/hooks/api/useGetDepositNft'
import useWithdrawCardMutation, { IWithdrawNFTInfo } from '~/hooks/mutations/useWithdrawCardMutation'
import useWithdrawProof, { IWithDrawProof, PROOF_TYPE } from '~/hooks/mutations/useWithdrawProofMutation'
import useMediaQuery from '~/hooks/useMediaQuery'
import { IWithdrawNFTResponse } from '~/widgets/MainApp/api/types'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'
import { IIngameCard, initialInGameCardData } from '~/widgets/MainApp/types'
import CardDetailModal from '~/widgets/Modal/CardDetailModal'
import WithdrawTokenModal from '~/widgets/Modal/WithdrawTokenModal'

import { getFromLocalStorage } from '../../MarketplaceList/utils/localStorage'
import { AUTH_TOKEN, IAuthToken } from '../../MarketplaceList/utils/types'
import CardImage from '../components/CardImage'
import { DepositButton, SelectButton, StyledButton, UnselectButton } from '../styles'

import { IFilters } from './types'

interface IRequestPropsType {
  filters: IFilters
  setFilters: Dispatch<any>
}

const Request = ({ filters }: IRequestPropsType) => {
  const { account } = useWeb3React()
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [isOpenWithdrawTokenModal, setIsOpenWithdrawTokenModal] = useState(false)
  const [isOpenCardDetailModal, setIsOpenCardDetailModal] = useState(false)
  const [cardDetail, setCardDetail] = useState<IIngameCard>(initialInGameCardData)
  const [selectedPackage, setSelectedPackage] = useState<number[]>([])
  const { mollectorCardAddress } = useMarketplaceContextHelper()
  const {
    data = {
      pages: [],
      pageParams: [],
    },
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useGetDepositNft(filters)
  const cardsPages = data.pages
  const { mutateAsync: onHandleFetchWithdrawProof, isLoading: isLoadingWithdrawProof } = useWithdrawProof(
    PROOF_TYPE.NFT,
  )
  const { mutateAsync: onHandleWithdrawCard, isLoading: isLoadingWtihdrawCard } = useWithdrawCardMutation()
  const isMobile = useMediaQuery('(max-width: 576px)')
  const authInfo = getFromLocalStorage<IAuthToken>(AUTH_TOKEN)

  const onHandleSelectPackage = (tokenId: number) => {
    if (selectedPackage.includes(tokenId)) {
      const newSelectedPackage = selectedPackage.filter((id) => id !== tokenId)
      setSelectedPackage(newSelectedPackage)
    } else {
      setSelectedPackage([...selectedPackage, tokenId])
    }
  }
  const onHandleRefetch = async () => {
    setIsSelectionMode(false)
    setSelectedPackage([])
    await refetch()
  }

  const accountName = useMemo(() => {
    return authInfo?.playerId
  }, [authInfo])

  const onWithdrawCard = async () => {
    if (accountName) {
      const nftData: IWithDrawProof[] = selectedPackage.map((tokenId) => {
        return {
          ownerAddress: account!,
          ownerAccount: accountName,
          tokenAddress: mollectorCardAddress!,
          tokenId: tokenId,
          dna: 0,
        }
      })
      const response: IWithdrawNFTResponse[] = await onHandleFetchWithdrawProof(nftData)
      const proofData = response.map((i) => {
        return [i.proof.v, i.proof.r, i.proof.s]
      })
      const withdrawNftData: IWithdrawNFTInfo[] = response.map((i) => {
        return {
          nftAddress: mollectorCardAddress!,
          dna: i.dna,
          ownerAccount: accountName,
          tokenId: i.tokenId,
          upgradeable: true,
        }
      })
      await onHandleWithdrawCard({
        proofs: proofData,
        nftData: withdrawNftData,
      })
      onHandleRefetch()
    }
  }

  const onHandleLoadMore = () => {
    fetchNextPage()
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Flex justifyContent="flex-end" width="100%" mb="20px">
            {isSelectionMode ? (
              <>
                <DepositButton
                  scale={isMobile ? scales.SM : scales.MD}
                  disabled={selectedPackage.length === 0}
                  isLoading={isLoadingWithdrawProof || isLoadingWtihdrawCard}
                  onClick={onWithdrawCard}
                >
                  Withdrawn {selectedPackage.length} card(s)
                </DepositButton>
                <UnselectButton
                  ml="10px"
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
              <>
                {/* <StyledButton
                  variant="quaternary"
                  scale={isMobile ? scales.SM : scales.MD}
                  onClick={() => setIsOpenWithdrawTokenModal(true)}
                >
                  Withdraw token
                </StyledButton> */}
                {cardsPages.length !== 0 && get(cardsPages, '[0].data', []).length !== 0 && (
                  <>
                    <SelectButton
                      scale={isMobile ? scales.SM : scales.MD}
                      onClick={() => {
                        setIsSelectionMode(true)
                        setSelectedPackage([])
                      }}
                    >
                      Select
                    </SelectButton>
                  </>
                )}
              </>
            )}
          </Flex>
          {cardsPages.map((cardsInfo) => {
            return (
              <Grid
                items={cardsInfo.data}
                settings={{
                  gridGap: 40,
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gridTemplateRows: 'auto',
                }}
              >
                {cardsInfo.data.map((card) => {
                  return (
                    <CardImage
                      isSelectionMode={isSelectionMode}
                      selectedPackage={selectedPackage}
                      onSelect={() => onHandleSelectPackage(card.tokenId)}
                      tokenId={card.tokenId}
                      onHandleRefetchCardList={onHandleRefetch}
                      onHandlePrimaryAction={() => {
                        setIsOpenCardDetailModal(true)
                        setCardDetail(card)
                      }}
                      isShowWithDraw
                      card={card}
                    />
                  )
                })}
              </Grid>
            )
          })}
          {hasNextPage && (
            <Flex justifyContent="center">
              <Button onClick={onHandleLoadMore} isLoading={isFetchingNextPage}>
                Load more
              </Button>
            </Flex>
          )}

          <WithdrawTokenModal
            isOpen={isOpenWithdrawTokenModal}
            onHandleClose={() => setIsOpenWithdrawTokenModal(false)}
          />
          <CardDetailModal
            isOpen={isOpenCardDetailModal}
            cardData={cardDetail}
            onRefetch={onHandleRefetch}
            onHandleClose={() => setIsOpenCardDetailModal(false)}
          />
        </>
      )}
    </>
  )
}

export default Request
