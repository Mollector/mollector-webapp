import styled from 'styled-components'

import BackgroundFrame from '~/assets/images/menu_frame.png'
import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'

import { Box } from '../../../..'

export const Container = styled(Box)`
  padding: 30px 0px;
  max-width: 1309px;
  margin: 0 auto;

  @media (max-width: 1400px) {
    max-width: 1100px;
  }

  @media (max-width: 1200px) {
    max-width: 900px;
  }

  @media (max-width: 1000px) {
    max-width: 700px;
  }

  @media (max-width: 820px) {
    padding: 12px 10px;
  }

  @media (max-width: 576px) {
    padding: 5px 10px;
  }
`

export const Logo = styled.img`
  width: 250px;
  &:hover {
    cursor: pointer;
  }
  filter: drop-shadow(31px 14px 40px rgba(53, 183, 255, 0.5));

  @media (max-width: 820px) {
    width: 160px;
    height: 80px;
  }

  @media (max-width: 576px) {
    width: 140px;
    height: 70px;
  }
`

export const Icon = styled(Box)`
  &:hover {
    cursor: pointer;
  }
`

export const StyledHeaderMarketplace = styled(Flex)`
  width: 100%;
  height: 92px;

  @media (max-width: 820px) {
    height: 60px;
  }
`

export const StyledText = styled(Text)`
  cursor: pointer;
  color: skyblue;
  font-weight: 400;

  &:hover {
    font-weight: 900;
  }
`

export const StyledTextDisable = styled(Text)`
  cursor: not-allowed;
  color: #ddd;
  font-weight: 400;
`

export const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;

  & > li {
    margin: 0 5px;
    overflow: hidden;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`

export const StyledBurgerIcon = styled.button<{
  open: boolean
}>`
  left: 2rem;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  opacity: 0.7;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  transition: opacity 400ms ease;

  @media (max-width: 1000px) {
    display: flex;
    padding-right: 40px;
  }

  @media (max-width: 576px) {
    width: 30px;
    height: 30px;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 1;
  }

  div {
    width: 32px;
    height: 4px;
    background: #e0e0e0;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }

    @media (max-width: 576px) {
      height: 3px;
      width: 30px;
    }
  }
`

export const HeaderBackground = styled(Flex)`
  background-image: url(${BackgroundFrame});
  background-repeat: no-repeat;
  background-size: 1309px 92px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 30px;

  @media (max-width: 1400px) {
    background-size: 100% 90px;
    background-repeat: no-repeat;
  }

  @media (max-width: 820px) {
    padding-left: 25px;
    background-size: 100% 60px;
    background-repeat: no-repeat;
    padding-right: 15px;
  }

  @media (max-width: 576px) {
    padding-left: 5px;
    background-position: center;
    background-size: 100% 50px;
    background-repeat: no-repeat;
    padding-right: 10px;
  }
`

export const MenuItem = styled(Text)<{
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

  &:hover {
    cursor: pointer;
    color: #ff8e2c;
  }

  &:not(:last-child) {
    margin-right: 30px;
  }

  &::before {
    display: ${(props) => (props.isActive ? 'block' : 'none')};
    content: '';
    position: absolute;
    top: 42px;
    left: 10px;
    z-index: 1;
    width: 85%;
    height: 3px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background-color: rgb(74 255 229 / 65%);
    box-shadow: 0px -1px 12px 6px rgb(74 255 229 / 29%);
  }
`
export const MenuItemWrapper = styled(Flex)<{
  isLoggedIn: boolean
}>`
  width: calc(100% - 250px);
  justify-content: ${(props) => (props.isLoggedIn ? 'space-between' : 'flex-end')};

  @media (max-width: 1000px) {
    justify-content: flex-end;
  }

  @media (max-width: 576px) {
    width: calc(100% - 160px);
  }
`
