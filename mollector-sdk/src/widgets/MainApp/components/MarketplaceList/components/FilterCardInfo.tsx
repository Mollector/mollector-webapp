import React from 'react'
import styled from 'styled-components'

import { CloseIcon } from '~/assets/icons'
import ClearImage from '~/assets/images/clear_icon.png'
import { Button } from '~/components/Button'

import { IFilterCard } from './types'
const Icon = styled.span`
  margin-left: 10px;
`

const ClearIcon = styled.img`
  margin-left: 5px;
`

const FilterButton = styled(Button)`
  background: #1ea7b6;
  border-radius: 5px;
  font-weight: 450;
  font-size: 10px;
  line-height: 32px;
`

const FilterCard = ({ info, type, onClearFilter }: IFilterCard) => {
  return (
    <FilterButton variant="secondary" scale="sm" mr="5px">
      {type}: {info}
      <ClearIcon src={ClearImage} onClick={onClearFilter} />
    </FilterButton>
  )
}

export default FilterCard
