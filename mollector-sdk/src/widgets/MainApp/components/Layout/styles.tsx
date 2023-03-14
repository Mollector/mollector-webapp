import styled from 'styled-components'

import { Box } from '../../../..'

export const Wrapper = styled(Box)`
  padding: 20px 0px;
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  margin: 0 auto;

  @media (max-width: 1400px) {
    max-width: 1100px;
  }

  @media (max-width: 1200px) {
    max-width: 900px;
  }

  @media (max-width: 1000px) {
    max-width: 700px;
  }

  @media (max-width: 576px) {
    max-width: 360px;
  }
`

export const ChildrenWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
`
