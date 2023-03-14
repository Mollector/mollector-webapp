import styled from 'styled-components'

import TabLightImage from '~/assets/images/tab_light.png'
import TabLine from '~/assets/images/tab-line.png'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'

export const getActivityColor = (status: string) => {
  if (status === 'Created') {
    return '#fcc109'
  }

  if (status === 'Success') {
    return '#2aa745'
  }

  return '#dc3545'
}

export const InventoryWrapper = styled(Flex)`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  padding-top: 20px;
`

export const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 40px;
  row-gap: 40px;
  width: 100%;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`

export const BoxWrapper = styled(Box)`
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;

  @media (max-width: 576px) {
    max-width: 350px;
    margin: 0 auto;
  }
`

export const CardRequestWrapper = styled(Flex)`
  width: 100%;
  min-height: 150px;
  border-radius: 15px;
  margin-bottom: 50px;

  @media (max-width: 1376px) {
    flex-direction: column;
  }
`

export const CardRequestLeft = styled(Flex)<{ isWithDraw: boolean }>`
  width: calc(100% - 200px);
  @media (max-width: 1376px) {
    width: 100%;
  }
`

export const CardRequestRight = styled(Flex)<{ isWithDraw: boolean }>`
  width: 200px;

  @media (max-width: 1376px) {
    margin-top: 20px;
  }
`

export const CardRequestWrapperImage = styled.div`
  max-width: 200px;
  width: calc(20% - 15px);
  margin-right: 15px;
`

export const TabWrapper = styled(Flex)`
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  border-bottom: 1px solid;
  border-image-slice: 1;
  border-width: 2px;
  border-image-source: linear-gradient(90deg, rgba(95, 207, 232, 0) 0%, #27767a 53.65%, rgba(95, 207, 232, 0) 100%);

  @media (max-width: 820px) {
    padding-bottom: 5px;
  }
`

export const TabInventory = styled(Text)<{ isSelected: boolean }>`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  padding-bottom: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isSelected ? '#F8C159' : '#207D87')};
  width: 25%;
  cursor: pointer;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 90px;
    z-index: -1;
    background-image: url(${TabLightImage});
    display: ${(props) => (props.isSelected ? 'block' : 'none')};
    bottom: 0px;
    background-size: 100% 100%;
    left: 0;
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    z-index: 1;
    background-image: url(${TabLine});
    display: ${(props) => (props.isSelected ? 'block' : 'none')};
    bottom: -1px;
    left: 0;
    background-size: 100% 100%;
`

export const MiniTab = styled(TabInventory)`
  width: 80%;
`

export const SelectButton = styled(Button)`
  background: linear-gradient(180deg, #25b9cb 0%, #016d79 100%);
  border-radius: 8px;
  font-weight: 450;
  font-size: 16px;
  line-height: 60px;
  color: #ffffff;
  border: none;
`

export const DepositButton = styled(SelectButton)`
  @media (max-width: 576px) {
    flex: 1;
  }
`

export const UnselectButton = styled(Button)`
  background: linear-gradient(180deg, #a6a6a6 0%, #4d4d4d 100%);
  border-radius: 8px;
  font-weight: 450;
  font-size: 16px;
  color: #0d1f2b;
  border: none;
`

export const StyledButton = styled(Button)`
  font-weight: 450;
  font-size: 14px;
  line-height: 32px;
  padding: 0 15px;
  border-radius: 4px;
  margin-right: 20px;
`

export const ArrowLeft = styled.img`
  width: 22px;
  height: 30px;

  &:hover {
    cursor: pointer;
  }
`

export const ArrowRight = styled(ArrowLeft)`
  transform: rotate(180deg);
`

export const EventCell = styled(Box)<{
  status: string
}>`
  font-weight: 800;
  color: ${(props) => getActivityColor(props.status)};
`
