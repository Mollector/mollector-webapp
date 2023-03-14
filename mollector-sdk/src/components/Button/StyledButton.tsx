import styled from 'styled-components'
import { layout, space, variant } from 'styled-system'

import { Box } from '../Box'

import { scaleVariants, styleVariants } from './theme'
import { BaseButtonProps } from './types'

interface TransientButtonProps extends BaseButtonProps {
  $isLoading?: boolean
}

const getDisabledStyles = ({ $isLoading }: TransientButtonProps) => {
  if ($isLoading === true) {
    return `
      &:disabled,
      &.mollector-button--disabled {
        cursor: not-allowed;
      }
    `
  }

  return `
    &:disabled,
    &.mollector-button--disabled {
      box-shadow: none;
      cursor: not-allowed;
      opacity: 0.5
    }
  `
}

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({ $isLoading = false }: TransientButtonProps) => {
  return $isLoading ? '.5' : '1'
}

export const StyledBorder = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  margin: auto;
  position: relative;
  padding: 10px;
  box-sizing: border-box;

  border: 1px;
  color: #fff;
  padding: 4px;
  background: radial-gradient(19.07% 63.8% at 100% 50%, rgba(30, 167, 182, 0.15) 0%, rgba(30, 167, 182, 0) 100%),
    radial-gradient(33.13% 110.87% at 100% 54.15%, rgba(32, 125, 135, 0.5) 0%, rgba(32, 125, 135, 0) 100%),
    radial-gradient(47.2% 97.71% at 0% 0%, rgba(30, 167, 182, 0.2) 0%, rgba(30, 167, 182, 0) 100%), rgb(13, 31, 43);
  background-clip: padding-box; /* !importanté */
  border: 1px solid transparent; /* !importanté */
  border-radius: 1em;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: -2px;
    z-index: -1;
    border-radius: inherit; /* !importanté */
    background: linear-gradient(180deg, #123450 0%, #435d6c 100%);
  }
`

export const StyledButton = styled.button<BaseButtonProps>`
  align-items: center;
  border: 0;
  border-radius: 8px;
  font-family: UTMGod;
  box-shadow: none;
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  opacity: ${getOpacity};
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;
  text-decoration: none;
  border: 1px solid;

  &:hover:not(:disabled):not(.mollector-button--disabled):not(.mollector-button--disabled):not(:active) {
    opacity: 0.65;
  }

  &:active:not(:disabled):not(.mollector-button--disabled):not(.mollector-button--disabled) {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }

  ${getDisabledStyles}
  ${variant({
    prop: 'scale',
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${layout}
  ${space}

  color: ${(props) => (props.color ? props.color : 'white')};
`
