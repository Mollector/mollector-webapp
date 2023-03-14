import React, { useContext, useState } from 'react'

import { Grid } from '~/components/Grid'
import Pagination from '~/components/Pagination'
import useGetMarketplaceData from '~/hooks/api/useGetMarketplaceData'
import NftPurchaseDetailModal from '~/widgets/Modal/NftPurchaseDetailModal'

import { limitItems } from '../../api'
import { MarketplaceContext } from '../../context/MarketplaceContext'
import { setFilters } from '../../store/reducer'
import { IMarketplaceCard, initialMarketplaceCardData } from '../../types'

import MarketCard from './components/MarketCard'
import { BoxWrapper } from './styles'

const MarketplaceBody = () => {
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false)
  const [cardData, setCardData] = useState<IMarketplaceCard>(initialMarketplaceCardData)
  const { state, dispatch } = useContext(MarketplaceContext)
  const { filters } = state

  const { currPage } = filters

  const { data: cardListData = { autions: [], total: 0 }, isFetching, refetch } = useGetMarketplaceData(filters)

  const { autions: cardList, total } = cardListData

  const onHandleRefetch = async () => {
    await refetch()
    setIsOpenDetailModal(false)
  }

  const setCurrPage = (page: number) => {
    dispatch(
      setFilters({
        ...filters,
        currPage: page,
      }),
    )
  }

  return (
    <BoxWrapper>
      <Grid
        items={cardList}
        isLoading={isFetching}
        settings={{
          gridGap: 40,
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gridTemplateRows: 'auto',
        }}
      >
        {cardList.map((card) => {
          return (
            <MarketCard
              data={card}
              onOpenDetail={(data) => {
                setCardData(data)
                setIsOpenDetailModal(true)
              }}
            />
          )
        })}
      </Grid>
      <NftPurchaseDetailModal
        isOpen={isOpenDetailModal}
        cardData={cardData}
        onHandleRefetch={onHandleRefetch}
        onHandleClose={() => {
          setIsOpenDetailModal(false)
          setCardData(initialMarketplaceCardData)
        }}
      />
      <Pagination
        currentPage={currPage}
        totalCount={total}
        pageSize={limitItems}
        onPageChange={(page: number) => setCurrPage(page)}
      />
    </BoxWrapper>
  )
}

export default MarketplaceBody
