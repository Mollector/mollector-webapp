import React from 'react'

import { LoadingScreen } from '../LoadingScreen'

import { GridContainer, StyledNoItemsText, Wrapper } from './styles'
import { IGrid } from './types'

const Grid = <T,>({ emptyDescription, items, isLoading, children, settings }: IGrid<T>) => {
  return (
    <Wrapper>
      {isLoading ? (
        <LoadingScreen isFullScreen={false} />
      ) : items.length === 0 ? (
        <StyledNoItemsText>{emptyDescription}</StyledNoItemsText>
      ) : (
        <GridContainer {...settings}>{children}</GridContainer>
      )}
    </Wrapper>
  )
}

Grid.defaultProps = {
  emptyDescription: 'No items to display',
  items: [],
  isLoading: false,
}

export default Grid
