import styled, { keyframes } from 'styled-components'

import loading1 from '~/assets/images/loading1.svg'
import loading2 from '~/assets/images/loading2.svg'

import { Box } from '../Box'

const bouncing = keyframes`
  0% {
    transform: translate3d(0, 5px, 0);
  }

  100% {
    transform: translate3d(0, -5px, 0);
  }
`

export const LoadingWrap = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    width: 68px;
    height: 100px;
    background: url(${loading1}) center no-repeat;
    position: absolute;
  }

  &::after {
    content: '';
    width: 56px;
    height: 82px;
    background: url(${loading2}) center no-repeat;
    position: absolute;
  }

  & > span {
    text-transform: uppercase;
    font-size: 12px;
    line-height: normal;
    letter-spacing: -0.24px;
    text-align: center;
    color: #14b5b1;
    position: absolute;
    bottom: -65px;
  }
`

// display: flex;
// justify-content: center;
// align-items: center;
// width: 100%;
// height: 100%;
// min-height: 100px;
// background-color: none;

export const Loading = styled(Box)<{
  isFullScreen: boolean
}>`
  position: ${(props) => props.isFullScreen && 'fixed'};
  min-height: ${(props) => props.isFullScreen && '100px'};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: ${(props) => props.isFullScreen && '0'};
  left: ${(props) => props.isFullScreen && '0'};
  background-color: none;
  z-index: -1;
`

export const LoadingImage = styled(Box)`
  z-index: 100;
  animation: ${bouncing} 0.8s alternate infinite;
  clip-path: polygon(50% 0%, 90% 50%, 50% 100%, 10% 50%);
  background: #14b5b1;
  width: 25px;
  height: 30px;
`
