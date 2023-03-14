import styled from 'styled-components'

import BackgroundFrame from '~/assets/images/menu_frame.png'
import SidePanelBottom from '~/assets/images/menu-mobile-bottom.png'
import SidePanelMiddle from '~/assets/images/menu-mobile-looop.png'
import SidePanelTop from '~/assets/images/menu-mobile-top.png'
import { Box } from '~/components/Box'
import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'

export const Wrapper = styled(Flex)`
  background-image: url(${BackgroundFrame});
  background-repeat: no-repeat;
  background-size: calc(100% - 5px) 50px;
  background-position-y: -3px;
  width: 100%;
  height: 50px;
  padding-left: 30px;
  padding-right: 30px;
  position: relative;
`

export const BurgerIcon = styled(Box)`
  width: 22px;
  height: 3px;
  background-image: linear-gradient(180deg, #d3b876, #8c6c2f);
  position: relative;
  top: 21px;
  z-index: 999;
  box-shadow: 0 3px 20px 0 #04131f;

  &:hover {
    cursor: pointer;
  }

  &::before {
    content: '';
    display: block;
    top: 7px;
    background-image: linear-gradient(180deg, #d3b876, #8c6c2f);
    box-shadow: 0 3px 20px 0 #04131f;
    width: 22px;
    height: 3px;
    position: absolute;
  }

  &::after {
    content: '';
    display: block;
    bottom: 7px;
    background-image: linear-gradient(180deg, #d3b876, #8c6c2f);
    box-shadow: 0 3px 20px 0 #04131f;
    width: 22px;
    height: 3px;
    position: absolute;
  }
`

export const LogoWrapper = styled(Box)`
  position: relative;
  left: calc(50% - 5px);
  transform: translateX(calc(-50% - 5px));
  top: 0px;

  &::before {
    content: '';
    position: absolute;
    filter: blur(16px);
    background-color: #35b7ff;
    display: block;
    left: -126px;
    top: 10px;
    z-index: -10;
    width: 74px;
    height: 21px;
  }
`

export const Frame = styled.img`
  width: 125px;
  height: 48px;
`

export const Logo = styled.img`
  width: 38px;
  position: absolute;
  left: 50%;
  transform: translateX(-49.5%);
  top: 2px;
`

export const NavWrapper = styled(Box)<{
  isOpen: boolean
}>`
  position: fixed;
  width: 310px;
  bottom: 20px;
  top: 18px;
  background-repeat: repeat-y;
  background-size: 100% auto;
  background-image: url(${SidePanelMiddle});
  z-index: 1000;
  padding: 18px 5px;
  transition: left 0.3s;
  left: ${(props) => (props.isOpen ? '0px' : '-500px')};

  &::before {
    top: -19px;
    content: '';
    width: 100%;
    display: block;
    height: 19px;
    background-size: cover;
    background-image: url(${SidePanelTop});
    background-repeat: no-repeat;
    position: absolute;
    left: ${(props) => (props.isOpen ? '0px' : '-500px')};
  }

  &::after {
    bottom: -19px;
    content: '';
    display: block;
    height: 19px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    left: ${(props) => (props.isOpen ? '0px' : '-500px')};
    background-image: url(${SidePanelBottom});
  }
`

export const CloseModalIcon = styled.img`
  position: absolute;
  right: 15px;
  top: 0px;
  width: 30px;
  height: 30px;
  &:hover {
    cursor: pointer;
  }
`

export const MollectorLogo = styled.img`
  position: absolute;
  top: -23px;
  width: 184px;
`

export const MenuWrapper = styled(Box)`
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  color: #fff;
  background: #102e41;
  background-clip: padding-box;
  border: solid 1px transparent;
  border-radius: 20px;
  margin: 0 5%;
  margin-top: 50px;
  height: 450px;
  padding-top: 40px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -1px;
    border-radius: inherit;
    background: linear-gradient(180deg, #639ad0 0%, rgba(91, 147, 181, 0.8) 38.54%, rgba(17, 47, 65, 0.64) 83.85%);
  }

  &::after {
    width: 280px;
    height: 233px;
    filter: blur(37px);
    background-color: #25adff;
    border-radius: 50%;
    top: 0px;
    z-index: -1;
    content: '';
    position: absolute;
  }
`

export const SecondaryMenuItem = styled(Text)<{
  isActive: boolean
}>`
  color: ${(props) => (props.isActive ? '#FF8E2C' : '#F8C159')};
  font-size: 20px;
  line-height: 20px;
  font-weight: 400;
  font-family: UTMGod;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-out;
  position: relative;
  padding: 20px 0px;

  &:hover {
    cursor: pointer;
    color: #ff8e2c;
  }

  &::before {
    background-image: linear-gradient(90deg, rgba(10, 28, 38, 0), #0a1c26 51%, rgba(10, 28, 38, 0));
    bottom: 0;
    left: 0;
    content: '';
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 1px;
  }

  &::after {
    bottom: -1px;
    background-image: linear-gradient(90deg, rgba(31, 83, 115, 0), #1f5373 52%, rgba(31, 83, 115, 0) 99%);
    content: '';
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 1px;
    left: 0;
  }
`

export const AccountInfoWrapper = styled(Flex)`
  position: absolute;
  bottom: 20px;
  flex-direction: column;
  left: 30px;
  width: calc(100% - 50px);
`
