import styled from 'styled-components'

import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { DropdownSecondary } from '~/components/Dropdown'
import { Flex } from '~/components/Flex'
import Input from '~/components/Input'

export const InventoryWrapper = styled(Flex)`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
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
`

export const FilterWrapper = styled(Box)`
  margin-bottom: 20px;
`

export const FilterCardWrapper = styled(Flex)``

export const FilterButton = styled(Button)`
  height: 56px !important;
  font-weight: 450;
  font-size: 14px;
  line-height: 32px;
  padding: 0 15px;
  border-radius: 4px;
  margin-right: 20px;
  width: 120px;
`
export const InfoListWrapper = styled(Box)`
  margin-bottom: 20px;
  display: grid;
  column-gap: 10px;
  row-gap: 10px;
  grid-template-columns: repeat(8, 1fr);

  @media (max-width: 1400px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`

export const SearchButton = styled(Button)`
  height: 56px;
  font-size: 14px;
  padding: 0 15px;
  border-radius: 4px;
  margin-left: 5px;
  width: 120px;
`

export const FilterIcon = styled.img`
  margin-left: 8px;
`

export const InputSearchWrapper = styled(Box)`
  @media (max-width: 820px) {
    flex: 1;
  }

  @media (max-width: 576px) {
    margin-top: 20px;
  }
`

export const ClearIcon = styled.img`
  margin-left: 5px;
`

export const ClearButton = styled(Button)`
  background: transparent;
  border: 1px solid #114e74;
  border-radius: 5px;
  font-weight: 450;
  font-size: 10px;
  line-height: 32px;
`
export const DropdownFilter = styled(DropdownSecondary)`
  width: 30%;

  @media (max-width: 820px) {
    width: 60%;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const SearchIcon = styled.img``

export const StyledFlexRow = styled(Flex)`
  justify-content: space-between;

  @media (max-width: 820px) {
    flex-direction: column;
  }
`

export const StyledInputWrapper = styled(Flex)`
  width: 60%;
  margin-right: 20px;

  @media (max-width: 820px) {
    margin-right: 0px;
    width: 100%;
    margin-bottom: 20px;
  }

  @media (max-width: 576px) {
    flex-direction: column;
  }
`
