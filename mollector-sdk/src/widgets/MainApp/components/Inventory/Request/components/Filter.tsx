import React, { useState } from 'react'

import ClearImage from '~/assets/images/clear_icon.png'
import FilterImage from '~/assets/images/filter_icon.png'
import SearchImage from '~/assets/images/search_icon.png'
import Input from '~/components/Input'
import FilterOptionsInGameAssetsModal from '~/widgets/Modal/FilterOptionsInGameAssetsModal'

import FilterCardInfo from './FilterCardInfo'
import {
  ClearButton,
  ClearIcon,
  DropdownFilter,
  FilterButton,
  FilterCardWrapper,
  FilterIcon,
  FilterWrapper,
  InputSearchWrapper,
  SearchIcon,
  StyledFlexRow,
  StyledInputWrapper,
} from './styles'
import { getCardRarity, getCardStar, getCardType } from './utils'

const OPTIONS = [
  {
    label: 'SORT DEFAULT',
    value: '1 startingPrice',
  },
  {
    label: 'PRICE: LOW TO HIGH',
    value: '1 startingPrice',
  },
  {
    label: 'PRICE: HIGH TO LOW',
    value: '-1 startingPrice',
  },
  {
    label: 'CARD ID: LOW TO HIGH',
    value: '1 tokenId',
  },
  {
    label: 'CARD ID: HIGH TO LOW',
    value: '-1 tokenId',
  },
]

const Filter = ({ resetFilters, setFilters, filters }: any) => {
  const [inputValue, setInputValue] = useState('')
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)
  const { type, rarity, tokenId, star } = filters

  const [dropdownValue, setDropdownValue] = useState(OPTIONS[0].label)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onClearAllFilter = () => {
    resetFilters()
    setInputValue('')
  }

  const onSearchTokenID = () => {
    setFilters({
      ...filters,
      tokenId: inputValue,
      currPage: 1,
    })
  }

  const onClearType = () => {
    setFilters({
      ...filters,
      type: '',
      currPage: 1,
    })
  }

  const onClearRarity = () => {
    setFilters({
      ...filters,
      rarity: '',
      currPage: 1,
    })
  }

  const onClearStar = () => {
    setFilters({
      ...filters,
      star: '',
      currPage: 1,
    })
  }

  const onClearTokenId = () => {
    setFilters({
      ...filters,
      tokenId: '',
      currPage: 1,
    })
    setInputValue('')
  }

  const onChangeSortFilter = (value: string) => {
    const [sortId, sortKey] = value.split(' ')
    setFilters({
      ...filters,
      sort: sortId,
      sortKey,
    })
  }

  return (
    <FilterWrapper>
      <StyledFlexRow>
        <StyledInputWrapper>
          <FilterButton onClick={() => setIsOpenFilterModal(true)} variant="quaternary">
            Filter <FilterIcon src={FilterImage} />
          </FilterButton>
          <InputSearchWrapper>
            <Input
              icon={<SearchIcon src={SearchImage} onClick={onSearchTokenID} />}
              value={inputValue}
              onPressEnter={onSearchTokenID}
              placeholder="Search ID"
              onChange={onChange}
              color="white"
              height="56px"
            />
          </InputSearchWrapper>
        </StyledInputWrapper>

        {/* <DropdownFilter
                    options={OPTIONS}
                    value={dropdownValue}
                    onChangeValue={(newVal) => {
                        setDropdownValue(newVal.label)
                        onChangeSortFilter(newVal.value)
                    }}
                /> */}
      </StyledFlexRow>
      <FilterCardWrapper mt="20px" ml="10px">
        {type && <FilterCardInfo type="Type" info={getCardType(type)} onClearFilter={onClearType} />}
        {rarity && <FilterCardInfo type="Rarity" info={getCardRarity(rarity)} onClearFilter={onClearRarity} />}
        {star && <FilterCardInfo type="Star" info={getCardStar(star)} onClearFilter={onClearStar} />}
        {tokenId && <FilterCardInfo type="Token ID" info={tokenId} onClearFilter={onClearTokenId} />}
        {(type || rarity || tokenId) && (
          <ClearButton scale="sm" onClick={onClearAllFilter}>
            Clear all <ClearIcon src={ClearImage} />
          </ClearButton>
        )}
      </FilterCardWrapper>
      <FilterOptionsInGameAssetsModal
        setFilters={setFilters}
        filters={filters}
        isOpen={isOpenFilterModal}
        onHandleClose={() => {
          setIsOpenFilterModal(false)
        }}
      />
    </FilterWrapper>
  )
}

export default Filter
