import React, { useContext, useEffect, useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'

import { Handler } from '~/commonType'
import { Flex } from '~/components/Flex'
import HLine from '~/components/HLine'
import { IFilters } from '~/widgets/MainApp/components/Inventory/Request/types'

import BaseModal, { FlexWrapButton, IBaseModal } from '../BaseModal'

import OptionFilterRadio from './OptionFilterRadio'
import OptionFilterRadioStar from './OptionFilterRadioStar'
import { FooterButton, HeaderTitle, HLineWrapper, Wrapper } from './styles'
import { Option, RARITY_OPTIONS, STAR_OPTIONS, TYPE_OPTIONS } from './types'

interface IFooter {
  onClose: Handler
  onApplyFilter: Handler
}

interface IFilterOptionsModal extends IBaseModal {
  filters: IFilters
  setFilters: any
}

const Footer = ({ onClose, onApplyFilter }: IFooter) => {
  return (
    <FlexWrapButton justifyContent="space-around">
      <FooterButton scale="sm" variant="quaternary" mb="20px" onClick={onClose} color="#207D87">
        Cancel
      </FooterButton>
      <FooterButton scale="sm" onClick={onApplyFilter} color="#000000">
        OK
      </FooterButton>
    </FlexWrapButton>
  )
}

const Header = () => {
  return <HeaderTitle>SELECT ATTRIBUTES</HeaderTitle>
}

const FilterOptionsInGameAssetsModal = ({ isOpen, onHandleClose, setFilters, filters }: IFilterOptionsModal) => {
  const { type, rarity, star } = filters

  const getInitialOption = (optionChecked: string | undefined, listOption: Option[]) => {
    listOption.forEach((opt) => {
      if (optionChecked && optionChecked === opt.value) {
        opt.checked = true
      } else {
        opt.checked = false
      }
    })

    return listOption
  }

  const [typeOptions, setTypeOptions] = useState<Option[]>(TYPE_OPTIONS)
  const [rarityOptions, setRarityOptions] = useState<Option[]>(RARITY_OPTIONS)
  const [starOptions, setStarOptions] = useState<Option[]>(STAR_OPTIONS)

  useEffect(() => {
    setTypeOptions(getInitialOption(type, TYPE_OPTIONS))
  }, [type])

  useEffect(() => {
    setRarityOptions(getInitialOption(rarity, RARITY_OPTIONS))
  }, [rarity])

  useEffect(() => {
    setStarOptions(getInitialOption(star, STAR_OPTIONS))
  }, [star])

  const onApplyFilter = () => {
    const filteredType = typeOptions.find((option) => option.checked === true)
    const filteredRarity = rarityOptions.find((option) => option.checked === true)
    const filteredStar = starOptions.find((option) => option.checked === true)
    onHandleClose()
    setFilters({
      ...filters,
      type: filteredType ? filteredType.value : '',
      rarity: filteredRarity ? filteredRarity.value : '',
      star: filteredStar ? filteredStar.value : '',
      currPage: 1,
    })
  }

  const onHandleSetOptions = (index: number, filter: string) => {
    let options
    let setOptions
    if (filter === 'type') {
      options = typeOptions
      setOptions = setTypeOptions
    } else if (filter === 'rarity') {
      options = rarityOptions
      setOptions = setRarityOptions
    } else {
      options = starOptions
      setOptions = setStarOptions
    }
    const newTypeOptions = cloneDeep(options)
    newTypeOptions.forEach((opt, i) => {
      if (i === index) {
        opt.checked = !opt.checked
      } else {
        opt.checked = false
      }
    })
    setOptions(newTypeOptions)
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onHandleClose={onHandleClose}
      isShowCloseIcon
      contentStyle={{
        maxWidth: '420px',
        width: '90vw',
        height: 'auto',
        maxHeight: '75vh',
        backgroundImage: 'linear-gradient(to top, #0D1F2B , #133B46)',
        border: '1.31467px solid #F8C159',
        padding: '30px 20px 20px 20px',
        borderRadius: '8px',
      }}
      isShowFooter
      isShowHeader
      footer={<Footer onApplyFilter={onApplyFilter} onClose={onHandleClose} />}
      header={<Header />}
    >
      <Wrapper>
        <OptionFilterRadio
          typeOptions={typeOptions}
          setTypeOptions={(index) => {
            onHandleSetOptions(index, 'type')
          }}
          title="Faction"
        />
        <HLine />
        <OptionFilterRadio
          typeOptions={rarityOptions}
          setTypeOptions={(index) => {
            onHandleSetOptions(index, 'rarity')
          }}
          title="Rarity"
        />
        <HLine />
        <OptionFilterRadioStar
          typeOptions={starOptions}
          setTypeOptions={(index) => {
            onHandleSetOptions(index, 'star')
          }}
          title="Star"
        />
      </Wrapper>
    </BaseModal>
  )
}

export default FilterOptionsInGameAssetsModal
