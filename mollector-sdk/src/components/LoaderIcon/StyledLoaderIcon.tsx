import styled, { keyframes } from 'styled-components'
import { variant } from 'styled-system'

import { Box } from '~/components/Box'

import { loadingInnerScaleVariants, loadingScaleVariants } from '../Button/theme'

import { LoaderIconProps } from './types'

export const spinning = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`

export const Wrapper = styled(Box)<LoaderIconProps>`
  display: inline-block;
  position: relative;
  width: ${(props) => (props.outerWidth ? props.outerWidth : '45px')};
  height: ${(props) => (props.outerWidth ? props.outerWidth : '45px')};
  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${(props) => (props.innerWidth ? props.innerWidth : '30px')};
    height: ${(props) => (props.innerWidth ? props.innerWidth : '30px')};
    margin: ${(props) => (props.margin ? props.margin : '8px')};
    border: ${(props) => `4px solid ${props.color}`};
    border-radius: 50%;
    animation: ${spinning} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) => `${props.color} transparent transparent transparent`};
    ${variant({
      prop: 'innerScale',
      variants: loadingInnerScaleVariants,
    })}
  }
  & {
    div:nth-child(1) {
      animation-delay: -0.45s;
    }

    div:nth-child(2) {
      animation-delay: -0.3s;
    }

    div:nth-child(3) {
      animation-delay: -0.15s;
    }
  }

  ${variant({
    prop: 'scale',
    variants: loadingScaleVariants,
  })}
`
