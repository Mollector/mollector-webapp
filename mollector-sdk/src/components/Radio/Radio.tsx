import styled from 'styled-components'
import { space } from 'styled-system'

import { RadioProps } from './types'

const Radio = styled.input.attrs({ type: 'radio' })<RadioProps>`
  appearance: none;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  display: inline-block;
  height: 30px;
  width: 30px;
  vertical-align: middle;
  transition: background-color 0.2s ease-in-out;
  border: 2px solid #1c4363;
  border-radius: 50%;

  &:after {
    border-radius: 50%;
    content: '';
    left: 5px;
    position: absolute;
    top: 5px;
    height: 16px;
    width: 16px;
  }

  &:hover:not(:disabled):not(:checked) {
    outline: none;
  }

  &:focus {
    outline: none;
  }

  &:checked {
    background-color: transparent;
    &:after {
      background: linear-gradient(180deg, #3b8595 0%, #1b476a 69.27%), #1c4363;
    }
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
  ${space}
`

Radio.defaultProps = {
  m: 0,
}

export default Radio
