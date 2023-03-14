import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import MenuItem from './MenuItem'
import { IBurgerMenu } from './types'

const Redirect = styled.a`
  font-size: 1.7rem;
  color: #3de131;
  font-weight: 700;
  cursor: pointer;
  padding: 20px;
  text-decoration: none;
  transition: opacity 400ms ease;
  opacity: 0.6;

  &:hover {
    opacity: 1;
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

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 1;
  }

  div {
    width: 2rem;
    height: 0.25rem;
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
  }
`
const Navigation = styled.nav<{
  open: boolean
}>`
  position: absolute;
  top: 130px;
  right: 11px;
  z-index: 999;
  width: calc(100% - 20px);
  font-size: 14px;
  font-weight: 600;
  background: radial-gradient(19.07% 63.8% at 100% 50%, rgba(30, 167, 182, 0.15) 0%, rgba(30, 167, 182, 0) 100%),
    radial-gradient(33.13% 110.87% at 100% 54.15%, rgba(32, 125, 135, 0.5) 0%, rgba(32, 125, 135, 0) 100%),
    radial-gradient(47.2% 97.71% at 0% 0%, rgba(30, 167, 182, 0.2) 0%, rgba(30, 167, 182, 0) 100%), rgb(13, 31, 43);
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${({ open }) => (open ? 'translateY(0px)' : 'translateY(-1000px)')};
  transition: transform 0.3s ease-in-out;
  @media (max-width: 820px) {
    display: flex;
  }

  @media (max-width: 576px) {
    top: 120px;
  }
`

const Menu = styled.ul`
  list-style: none;
`

const BurgerMenu = ({ urlConfig, onNavigateTo, open }: IBurgerMenu) => {
  return (
    <Navigation open={open}>
      <Menu>
        {urlConfig.map(({ name, path }) => {
          return <MenuItem name={name} path={path} onNavigateTo={onNavigateTo} key={name} />
        })}
      </Menu>
    </Navigation>
  )
}

export default BurgerMenu
