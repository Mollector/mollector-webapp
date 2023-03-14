import styled from 'styled-components'

import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'

export const Wrapper = styled(Box)`
  max-height: 450px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 20px;

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #000000;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #f8c159;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #f8c159;
  }
`
export const DropdownItem = styled(Flex)`
  margin: 6px 0;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

export const MockListItems = styled.div<{ itemsLength: number }>`
  height: ${(props) => props.itemsLength * 36}px;
`

export const FooterButton = styled(Button)`
  height: 40px;
  width: 160px;
  font-weight: 450;
  font-size: 16px;
  line-height: 32px;
`

export const HeaderTitle = styled(Text)`
  font-weight: 400;
  font-family: UTMGod;
  font-size: 18px;
  line-height: 18px;
  color: #f8c159;
  text-align: center;
`

export const HLineWrapper = styled.div``

export const ItemOptionLabel = styled(Text)`
  font-weight: 400;
  font-size: 15px;
  font-family: UTMGod;
  line-height: 32px;
  text-transform: uppercase;
  color: #d2d1b5;
`

export const Star = styled.img`
  width: 20px;
  height: 20px;
`
