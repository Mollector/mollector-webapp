import React, { useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import styled, { keyframes } from 'styled-components'

import { Flex } from '../Flex'
import { LoaderIcon } from '../LoaderIcon'

import { simplePreload } from './helper'
import { IImage } from './type'

export const LoaderBox = styled(Flex)`
  align-items: center;
  justify-content: center;
  padding-top: 50%;
  height: 100%;
  width: 100%;
  padding-bottom: 50%;
`

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const Wrapper = styled.div<{ width?: string; height?: string }>`
  ${({ width }) => `width: ${width ? width : '100%'}`};
  ${({ height }) => `height: ${height ? height : '100%'}`};
  position: relative;
  overflow: hidden;
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  user-select: none;
  user-drag: none;
  animation: ${fadeIn} 500ms ease;
`

const Image = ({ src, width, height, wrapperStyle, ...props }: IImage) => {
  const [isVisibilitySensorActive, setIsVisibilitySensorActive] = useState(true)
  const [hasFailed, setHasFailed] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [shouldShowLoader, setShouldShowLoader] = useState(true)

  const onHandleVisibilityChange = (isVisible: boolean) => {
    if (!isVisible) return
    setIsVisibilitySensorActive(false)
    preloadImage()
  }

  const handleImageLoaderLoaded = () => {
    setHasLoaded(true)
    setShouldShowLoader(false)
  }

  const handleImageLoaderFailed = () => {
    setHasFailed(true)
  }

  const preloadImage = () => {
    simplePreload(src).then(handleImageLoaderLoaded).catch(handleImageLoaderFailed)
  }

  return (
    <VisibilitySensor onChange={onHandleVisibilityChange} active={isVisibilitySensorActive} partialVisibility>
      <Wrapper width={width} height={height} style={wrapperStyle}>
        {shouldShowLoader && (
          <LoaderBox>
            <LoaderIcon color="#14B5B1" />
          </LoaderBox>
        )}
        {hasLoaded && <Img src={src} {...props} />}
      </Wrapper>
    </VisibilitySensor>
  )
}

export default Image
