import React, { useContext } from 'react'

import { Box } from '~/components/Box'
import { MarketplaceContext } from '~/widgets/MainApp/context/MarketplaceContext'

import { Wrapper } from './styles'

const Home = () => {
  const { dispatch } = useContext(MarketplaceContext)

  return (
    <Wrapper>
      <Box>This is marketplace</Box>
    </Wrapper>
  )
}

export default Home
