import styled from 'styled-components'
import { flexbox, grid } from 'styled-system'

import { Box, Flex } from '../..'
import { Text } from '../Text'

import { GridProps } from './types'

export const Wrapper = styled(Box)`
  width: 100%;
  margin-bottom: 30px;
`

export const StyledNoItemsText = styled(Text)`
  color: #6c757d;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoaderWrapper = styled(Flex)`
  width: 100%;
`

export const GridContainer = styled(Box)<GridProps>`
  display: grid;
  width: 100%;
  ${flexbox}
  ${grid}
  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`
