import styled from 'styled-components'

export const StyledSwitchWrapper = styled.div`
  display: inline-block;
`

export const StyledSwitch = styled.span`
  position: relative;
  width: 48px;
  height: 24px;
  float: left;
`

export const StyledSwitchInput = styled.input`
  display: none;
  &:checked + .slider {
    background-color: #14b5b1;
  }
  &:checked + .slider:before {
    transform: translateX(26px);
  }
  &:focus + .slider {
    box-shadow: 0 0 1px #14b5b1;
  }
`

export const StyledSwitchLabel = styled.label`
  margin-left: 12px;
  cursor: pointer;
  font-weight: 400;
  font-size: 15px;
  line-height: 32px;
  color: #d2d1b5;
  text-transform: uppercase;
`

export const StyledSwitchButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  border: 0;
  outline: none;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
  cursor: pointer;
  &:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`
