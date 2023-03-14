import React from 'react'

import {
  StyledSwitch,
  StyledSwitchButton,
  StyledSwitchInput,
  StyledSwitchLabel,
  StyledSwitchWrapper,
} from './StyledSwitchButton'
import { SwitchButtonProps } from './types'

const SwitchButton = (props: SwitchButtonProps) => {
  const { isChecked, setIsChecked, label } = props
  const handleChange = (e: any) => {
    setIsChecked(e.target.checked)
  }

  const toggleChecked = () => {
    setIsChecked(!isChecked)
  }
  return (
    <StyledSwitchWrapper>
      <StyledSwitch>
        <StyledSwitchInput type="checkbox" id="toggleInput" checked={isChecked} onChange={handleChange} />
        <StyledSwitchButton className="slider" type="button" onClick={toggleChecked}></StyledSwitchButton>
      </StyledSwitch>
      <StyledSwitchLabel htmlFor="toggleInput" onClick={toggleChecked}>
        {label}
      </StyledSwitchLabel>
    </StyledSwitchWrapper>
  )
}

export default SwitchButton
