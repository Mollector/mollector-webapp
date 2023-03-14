import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

import { config, useSpring } from '@react-spring/web'
import { animated } from '@react-spring/web'

import { RightArrow } from '~/assets/icons'
import DropdownImage from '~/assets/images/dropdown_icon.png'
import useOnClickOutside from '~/hooks/useOnClickOutside'

import { Box } from '../Box'
import { Flex } from '../Flex'
import { Text } from '../Text'

import { Icon } from './styles'
import { IDropdownOptionsList, IDropdownSecondary, IDropdownSecondaryOption } from './types'

const DropdownWrapper = styled(Box)`
  position: relative;
  align-items: center;
  display: flex;
`

const DropdownInput = styled.input`
  caret-color: transparent;
  overflow: hidden;
  cursor: pointer;
  font-weight: 450;
  font-size: 14px;
  line-height: 32px;
  color: #ffffff;
  text-overflow: ellipsis;
  white-space: no-wrap;
  border: 1px solid #207d87;
  background-color: transparent;
  padding: 0 10px;
  height: 56px;
  border-radius: 6px;
  width: 100%;

  &:focus-visible {
    outline: none;
  }
`

const DropdownListWrapper = styled(animated.div)<{ isOpen: boolean }>`
  position: absolute;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  top: 60px;
  background: #0d1f2b;
  border: 1px solid #207d87;
  border-radius: 8px;
  z-index: 10;
  width: 100%;
  transition: display 0.25s ease-out;
  }
`

const DropdownListItem = styled(Box)`
  font-weight: 450;
  font-size: 14px;
  line-height: 32px;
  color: #ffffff;
`

const DropdownListItemWrapper = styled(Flex)`
  padding: 5px 0px 5px 11px;

  &:last-child {
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }

  &:first-child {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }

  &:hover {
    cursor: pointer;
    background-color: #207d87;
  }
`

const DropdownIcon = styled.img`
  position: absolute;
  right: 15px;
`

const DropdownOptionsList = ({ options, isOpen, onHandleSetValue }: IDropdownOptionsList) => {
  const styles = useSpring({
    transform: isOpen ? 'translate3D(0,10px,0)' : 'translate3D(0,-10px,0)',
    opacity: isOpen ? 1 : 0,
    config: {
      ...config.stiff,
      duration: 120,
    },
  })

  return (
    <DropdownListWrapper isOpen={isOpen} style={styles}>
      {options.map((option) => {
        const { Icon } = option
        return (
          <DropdownListItemWrapper justifyContent="space-between" onClick={() => onHandleSetValue(option)}>
            {option.Icon && Icon}
            <DropdownListItem>{option.label}</DropdownListItem>
          </DropdownListItemWrapper>
        )
      })}
    </DropdownListWrapper>
  )
}

const DropdownSecondary = ({
  label,
  disabled = false,
  options,
  value,
  onChangeValue,
  placeholder,
  isShowIcon = true,
  ...rest
}: IDropdownSecondary) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const onHandleClickOutSide = useCallback(() => {
    setIsOpen(false)
  }, [containerRef])

  useOnClickOutside(containerRef, onHandleClickOutSide)

  const onHandleToggleDropdownList = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const onHandleSetValue = (newValue: IDropdownSecondaryOption) => {
    onChangeValue(newValue)
    onHandleClickOutSide()
  }

  return (
    <Box ref={containerRef} display="inline-block" {...rest}>
      {label && <Text>{label}</Text>}
      <DropdownWrapper>
        <DropdownInput value={value || placeholder} onClick={onHandleToggleDropdownList} />
        {isShowIcon && <DropdownIcon src={DropdownImage} />}
        <DropdownOptionsList options={options} isOpen={isOpen} onHandleSetValue={onHandleSetValue} />
      </DropdownWrapper>
    </Box>
  )
}

export default DropdownSecondary
