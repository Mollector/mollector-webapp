import styled from 'styled-components'

import { Box } from '../../../..'

export const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 288px);
  column-gap: 40px;
  row-gap: 40px;
  width: 100%;
  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 288px);
  }

  @media (max-width: 750px) {
    grid-template-columns: 288px;
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(4, 288px);
  }
`
