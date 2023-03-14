import styled from 'styled-components'

import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { DropdownSecondary } from '~/components/Dropdown'
import { Flex } from '~/components/Flex'
import Input from '~/components/Input'
import { Text } from '~/components/Text'

export const Wrapper = styled(Box)`
  max-height: 450px;
  padding: 15px 0px;

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

export const FooterButton = styled(Button)`
  font-weight: 450;
  width: 200px;
  font-size: 16px;
`

export const HeaderTitle = styled(Text)`
  font-weight: 400;
  font-family: UTMGod;
  font-size: 18px;
  line-height: 18px;
  color: #f8c159;
  text-align: center;
`

export const PriceInfoWrapper = styled(Flex)`
  justify-content: space-between;
  border: 1px solid #207d87;
  border-radius: 12px;
  padding: 0 14px;
  align-items: center;
  margin-bottom: 15px;
`

export const PriceText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #207d87;
`

export const PriceValue = styled(Text)`
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  color: #f8c159;
  margin-left: 5px;
`

export const PricePaySymbol = styled(Text)`
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #207d87;
`

export const VLine = styled.img`
  margin-right: 5px;
`

export const InputPrice = styled(Input)`
  border: none;
`

export const DropdownFilter = styled(DropdownSecondary)`
  width: 100%;
  margin-bottom: 15px;
`
