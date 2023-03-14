import React, { useState } from 'react'

import Input from '.'

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {},
}

export const InputComponent = () => {
  const [value, setValue] = useState('')
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  return (
    <>
      <Input value={value} placeholder="Search" onChange={onChange} padding="30px" />

      <Input value={value} placeholder="Copy" onChange={onChange} color="red" />
      <p>{value}</p>
    </>
  )
}
