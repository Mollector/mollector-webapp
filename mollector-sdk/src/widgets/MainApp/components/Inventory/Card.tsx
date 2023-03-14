import React, { useState } from 'react'

import { useWeb3React } from '@web3-react/core'

import { scales } from '~/components/Button/types'
import { Flex } from '~/components/Flex'
import { Grid } from '~/components/Grid'
import { LoadingScreen } from '~/components/LoadingScreen'
import Pagination from '~/components/Pagination'
import useGetCardList from '~/hooks/api/useGetCardList'
import useMediaQuery from '~/hooks/useMediaQuery'
import DepositCardModal from '~/widgets/Modal/DepositCardModal'
import DepositTokenModal from '~/widgets/Modal/DepositTokenModal'
import SaleModal from '~/widgets/Modal/SaleModal'

import { LIMIT_CARD_PER_PAGE } from '../../api'
import { ICard, initialCardData } from '../../types'

import CardImage from './components/CardImage'
import { BoxWrapper, DepositButton, SelectButton, StyledButton, UnselectButton } from './styles'

const Card = () => {
  const { account, chainId } = useWeb3React()
  const [isOpenSaleModal, setIsOpenSaleModa] = useState(false)
  const [currPage, setCurrPage] = useState(1)
  const [isOpenDepositTokenModa, setIsOpenDepositTokenModal] = useState(false)
  const [isOpenDepositCardModal, setIsOpenDepositCardModal] = useState(false)
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<number[]>([])
  const [cardDetail, setCardDetail] = useState<ICard>(initialCardData)
  const isMobile = useMediaQuery('(max-width: 576px)')
  const {
    data: cardData = {
      cards: [],
      total: 0,
    },
    isFetching,
    refetch,
  } = useGetCardList(account!, currPage, chainId!)
  const { cards, total } = cardData

  const onHandleRefetch = async () => {
    setIsOpenSaleModa(false)
    setIsOpenDepositCardModal(false)
    setIsSelectionMode(false)
    setSelectedPackage([])
    await refetch()
  }

  const onHandleSelectPackage = (tokenId: number) => {
    if (selectedPackage.includes(tokenId)) {
      const newSelectedPackage = selectedPackage.filter((id) => id !== tokenId)
      setSelectedPackage(newSelectedPackage)
    } else {
      setSelectedPackage([...selectedPackage, tokenId])
    }
  }

  return (
    <BoxWrapper>
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <>
          <Flex justifyContent="flex-end" width="100%" mb="20px">
            {isSelectionMode ? (
              <>
                <DepositButton
                  scale={isMobile ? scales.SM : scales.MD}
                  disabled={selectedPackage.length === 0}
                  onClick={() => setIsOpenDepositCardModal(true)}
                >
                  Deposit {selectedPackage.length} card(s)
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
              cards.length !== 0 && (
                <>
                  <StyledButton
                    scale={isMobile ? scales.SM : scales.MD}
                    variant="quaternary"
                    onClick={() => setIsOpenDepositTokenModal(true)}
                  >
                    Deposit token
                  </StyledButton>
                  <SelectButton scale={isMobile ? scales.SM : scales.MD} onClick={() => setIsSelectionMode(true)}>
                    Select
                  </SelectButton>
                </>
              )
            )}
          </Flex>
          <Grid
            items={cards}
            settings={{
              gridGap: 40,
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gridTemplateRows: 'auto',
            }}
          >
            {cards.map((card) => {
              return (
                <CardImage
                  isShowAction
                  isSelectionMode={isSelectionMode}
                  selectedPackage={selectedPackage}
                  onSelect={() => onHandleSelectPackage(card.tokenId)}
                  tokenId={card.tokenId}
                  onHandleRefetchCardList={onHandleRefetch}
                  onHandlePrimaryAction={() => {
                    setCardDetail(card)
                    setIsOpenSaleModa(true)
                  }}
                  onHandleSecondaryAction={() => {
                    setSelectedPackage([card.tokenId])
                    setIsOpenDepositCardModal(true)
                  }}
                  card={card}
                />
              )
            })}
          </Grid>
          <Pagination
            currentPage={currPage}
            totalCount={total}
            pageSize={LIMIT_CARD_PER_PAGE}
            onPageChange={(page: number) => setCurrPage(page)}
          />
          <SaleModal
            isOpen={isOpenSaleModal}
            cardData={cardDetail}
            onHandleClose={() => setIsOpenSaleModa(false)}
            onRefetch={onHandleRefetch}
          />
        </>
      )}
      <DepositCardModal
        isOpen={isOpenDepositCardModal}
        selectedDepositCard={selectedPackage}
        onHandleRefetch={onHandleRefetch}
        onHandleClose={() => {
          setIsOpenDepositCardModal(false)
          if (!isSelectionMode) {
            setSelectedPackage([])
          }
        }}
      />
      <DepositTokenModal isOpen={isOpenDepositTokenModa} onHandleClose={() => setIsOpenDepositTokenModal(false)} />
    </BoxWrapper>
  )
}

export default Card
