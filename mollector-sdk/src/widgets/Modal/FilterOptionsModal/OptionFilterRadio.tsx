import React, { useState } from 'react'

import { Dropdown } from '~/components/Dropdown'
import { Radio } from '~/components/Radio'

import { DropdownItem, ItemOptionLabel, MockListItems } from './styles'
import { ITypeFilter } from './types'

const OptionFilterRadio = ({ typeOptions, setTypeOptions, title }: ITypeFilter) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dropdown title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
      {isOpen ? (
        <>
          {typeOptions.map((option, index) => {
            return (
              <DropdownItem
                onClick={() => {
                  setTypeOptions(index)
                }}
              >
                <ItemOptionLabel>{option.label}</ItemOptionLabel>
                <Radio value={option.value} checked={option.checked} />
              </DropdownItem>
            )
          })}
        </>
      ) : (
        <MockListItems itemsLength={typeOptions.length} />
      )}
    </Dropdown>
  )
}

export default OptionFilterRadio
