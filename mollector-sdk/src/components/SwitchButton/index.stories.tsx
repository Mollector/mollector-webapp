import React, { useState } from 'react'

import SwitchButton from '.'

export default {
  title: 'Components/SwitchButton',
  component: SwitchButton,
  argTypes: {},
}

export const SwitchButtonComponent = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <>
      <SwitchButton isChecked={isChecked} setIsChecked={setIsChecked} label="Notification" />
    </>
  )
}
