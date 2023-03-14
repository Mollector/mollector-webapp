import styled from 'styled-components'

import { Box } from '~/components/Box'
import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'

export const Icon = styled.img`
  // width: 10px;
  // height: 10px;
`
export const InfoWrapper = styled(Flex)`
  box-shadow: inset 0px -1px 0px #114e74;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
`

export const HeaderText = styled(Text)`
  color: #f8c159;
  margin: 0px 10px;
  font-weight: bold;

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 576px) {
    display: none;
  }
`

export const MobileHeaderText = styled(Text)`
  color: #f8c159;
  font-weight: bold;
  font-size: 12px;
  display: none;

  @media (max-width: 576px) {
    display: flex;
    align-items: center;
    margin: 0px 10px;
    width: 50%;
  }
`
