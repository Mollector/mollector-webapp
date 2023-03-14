import styled from 'styled-components'

import BackgroundPackImage from '~/assets/images/backgroundPackInfo.png'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'

export const StyledPackCard = styled(Flex)`
  justify-content: center;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`

export const BackgroundPack = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 30%;
  background-image: url(${BackgroundPackImage});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 350px;
  margin-bottom: 30px;

  @media (max-width: 576px) {
    width: 100%;
    height: 300px;
    margin-top: 30px;
  }
`

export const PackInfoWrapper = styled(Flex)`
  flex-direction: column;
  width: calc(60% - 20px);
  justify-content: space-between;
  margin-left: 20px;
  margin-bottom: 30px;

  @media (max-width: 576px) {
    width: 100%;
    margin: 0px;
    padding: 0px 30px;
  }
`

export const PackImage = styled.img`
  width: 200px;
`

export const PackTitle = styled(Text)`
  line-height: 20px;
  font-weight: 400;
  color: #ffffff;
  font-size: 30px;

  @media (max-width: 576px) {
    margin-bottom: 30px;
    margin: 0 auto;
  }
`

export const PackText = styled(Text)`
  color: #ffffff;
  font-family: Gotham, 'Kanit', sans-serif;
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
`

export const PackQuantityText = styled(Text)`
  color: #207D87;
  font-size: 18px;
  font-weight: 450;
  line-height: 20px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /
  font-family: Gotham, 'Kanit', sans-serif;
`

export const InfoBox = styled(Box)`
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border-radius: 10px;

  @media (max-width: 576px) {
    margin-bottom: 30px;
    padding: 20px;
  }
`

export const SignalWrapper = styled(Box)`
  &:hover {
    cursor: pointer;
  }
`

export const PurchaseWrapper = styled(Flex)`
  border: 1px solid #207d87;
  border-radius: 12px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`

export const IconWrapper = styled(Box)`
  margin: 0px 10px;
`

export const TokenImage = styled.img`
  width: 20px;
  height: 20px;
`

export const PurchaseBoxWrapper = styled(Flex)`
  align-items: center;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`

export const QuantityWrapper = styled(Flex)`
  width: 70%;
  align-items: center;

  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 15px;
  }
`

export const StyledPurchasedButton = styled(Button)`
  flex: 1;

  @media (max-width: 576px) {
    flex: unset;
  }
`

export const ButtonWrapper = styled(Box)`
  width: 30%;

  @media (max-width: 576px) {
    width: 100%;
  }
`
