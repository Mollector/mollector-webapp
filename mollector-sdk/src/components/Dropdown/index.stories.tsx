import React, { useState } from 'react'

import DropdownSecondary from './DropdownSecondary'

export default {
  title: 'Components/Dropdown',
  component: DropdownSecondary,
  argTypes: {},
}

const OPTIONS = [
  {
    label: 'Dog',
    value: 'dog',
  },
  {
    label: 'Cat',
    value: 'cat',
  },
  {
    label: 'Purple',
    value: 'purple',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Blue',
    value: 'blue',
  },
  {
    label: 'Red',
    value: 'red',
  },
  {
    label: 'Yellow',
    value: 'yellow',
  },
]

export const DropdownSecondaryComponent = () => {
  const [dropdownValue, setDropdownValue] = useState('')

  return (
    <div
      style={{
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
      }}
    >
      <DropdownSecondary
        options={OPTIONS}
        value={dropdownValue}
        placeholder="Select your token"
        onChangeValue={(newVal) => setDropdownValue(newVal.label)}
      />
    </div>
  )
}
