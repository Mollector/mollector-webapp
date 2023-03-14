import React, { useState } from 'react'

import Radio from './Radio'

export default {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {},
}

export const Default: React.FC = () => {
  const [radio, setRadio] = useState('one')

  const handleChange = (evt: any) => {
    const { value } = evt.target
    setRadio(value)
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      <Radio value="one" onChange={handleChange} checked={radio === 'one'} />
    </div>
  )
}
