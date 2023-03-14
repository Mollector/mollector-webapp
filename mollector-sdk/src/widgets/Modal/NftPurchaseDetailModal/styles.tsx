import styled from 'styled-components'

import { Box } from '~/components/Box'
import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'

export const Wrapper = styled(Flex)`
  padding: 20px;
  justify-content: center;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`

export const CardImageWrapper = styled(Box)`
  @media (max-width: 576px) {
    margin: 0 auto;
  }
`

export const CardInfo = styled(Box)`
  width: calc(100% - 400px);
  margin-left: 20px;

  @media (max-width: 576px) {
    width: 100%;
    margin-left: 0px;
  }
`
export const BoxImage = styled(Box)`
  width: 300px;
  // margin-bottom: 20px;
`

export const InfoBox = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  width: calc(50% - 10px);
  padding: 10px 0px;
  align-items: center;
  border: 1px solid #19b7b3;
  border-radius: 5px;
`

export const InfoWrapper = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`

export const PriceInfoWrapper = styled(Flex)`
  justify-content: space-between;
  width: 65%;
  border: 1px solid #207d87;
  border-radius: 12px;
  padding: 0 14px;
  align-items: center;

  @media (max-width: 820px) {
    width: 100%;
    margin-bottom: 15px;
  }
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
  font-size: 16px;
  line-height: 20px;
  color: #207d87;
`

export const CardName = styled(Text)`
  font-weight: 700;
  font-size: 24px;
  font-family: UTMGod;
  line-height: 32px;
  text-transform: uppercase;
  color: #ffffff;
`

export const CardId = styled(Text)`
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #f8c159;

  @media (max-width: 576px) {
    font-size: 16px;
  }
`

export const CardInfoWrap = styled(Box)`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 15px 15px 30px;
  margin: 16px 0;
`

export const CardActionWrap = styled(CardInfoWrap)`
  padding: 25px 30px;
  margin: 0;
`

export const CardDesc = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
`

export const TitleContract = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  display: flex;
`

export const ContractText = styled(TitleContract)`
  color: #f8c159;
  margin-left: 5px;
`

export const HLineWrapper = styled.div`
  margin: 25px 0;

  @media (max-width: 825px) {
    margin: 15px 0;
  }
`

export const VLine = styled.img`
  margin-right: 5px;
`

export const ButtonWrapper = styled(Box)`
  width: 32%;

  @media (max-width: 820px) {
    width: 100%;
  }
`

export const Title = styled(Text)`
  font-weight: 400;
  color: #14b5b1;
  font-size: 18px;
  line-height: 16px;
  margin-bottom: 5px;
`

export const ContractInfoWrapper = styled(Flex)`
  justify-content: space-between;

  @media (max-width: 820px) {
    flex-direction: column;
  }
`

export const BuyWrapper = styled(Flex)`
  justify-content: space-between;

  @media (max-width: 820px) {
    flex-direction: column;
  }
`

export const IconWrapper = styled(Box)`
  margin-left: 5px;

  &:hover {
    cursor: pointer;
  }
`

export const CopyWrapper = styled.span`
  display: inline-block;
`

export const SkillImage = styled.img`
  width: 24px;
  height: 36px;
  margin-right: 10px;
`
export const SkillWrapper = styled(Box)`
  margin-bottom: 10px;
`

export const IdWrapper = styled(Box)`
  border-radius: 5px;
  color: #f8c159;
  background-color: #80808045;
  padding: 0px 5px;
  padding-top: 5px;
  margin: 0 auto;
  margin-bottom: 5px;
`
