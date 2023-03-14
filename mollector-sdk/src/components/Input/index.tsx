import React, { ElementType } from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'

import { Box } from '../Box'

import { BaseInputProps, InputProps } from './types'

const InputStyled = styled.input<BaseInputProps>`
  height: ${(props) => (props.height ? props.height : '56px')};
  border: 1px solid #207d87;
  outline: none;
  width: 100%;
  padding: ${(props) => (props.icon ? '5px 10px 5px 40px' : '5px 10px')};
  border-radius: 5px;
  font-weight: 450;
  font-size: 14px;
  line-height: 32px;
  background-color: transparent;
  caret-color: ${(props) => (props.color ? props.color : '#19B7B3')};
  color: ${(props) => (props.color ? props.color : '#19B7B3')};
  &::placeholder {
    color: ${(props) => (props.color ? props.color : '#19B7B3')};
  }
  ${space}
`

const InputWrapper = styled(Box)`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
`

const IconWrapper = styled.span`
  position: absolute;
  left: 12px;
  cursor: pointer;
`

const Input = <E extends ElementType = 'input'>(props: InputProps<E>): JSX.Element => {
  const { height, onPressEnter = () => {}, icon, ...rest } = props

  const handleEnter = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      onPressEnter()
    }
  }

  if (icon) {
    return (
      <InputWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <InputStyled height={height} {...rest} icon={icon} onKeyDown={handleEnter} />
      </InputWrapper>
    )
  }
  return <InputStyled height={height} {...rest} onKeyDown={handleEnter} />
}

export default Input
