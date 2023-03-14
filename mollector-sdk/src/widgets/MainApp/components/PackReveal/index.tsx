import React, { useContext } from 'react'

import { Box } from '~/components/Box'
import { LoadingScreen } from '~/components/LoadingScreen'
import useGetNewTokenIds from '~/hooks/api/useGetNewTokenIds'
import { MarketplaceContext } from '~/widgets/MainApp/context/MarketplaceContext'

import PackRevealItem from './PackRevealItem'
import { StyledPackReveal } from './StyledPackReveal'

const PackReveal = () => {
  const { state } = useContext(MarketplaceContext)
  const { newPackIds } = state
  const {
    data: cardInfoList = {
      cards: [],
      total: 0,
    },
    isFetching,
  } = useGetNewTokenIds(newPackIds)
  const { cards } = cardInfoList
  return (
    <Box>
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <StyledPackReveal>
          <div className="container">
            {cards.map((cardData) => (
              <div className="item">
                <PackRevealItem cardData={cardData} />
              </div>
            ))}
          </div>
        </StyledPackReveal>
      )}
    </Box>
  )
}

export default PackReveal
