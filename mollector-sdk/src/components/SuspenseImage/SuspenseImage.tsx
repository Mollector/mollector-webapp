import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Box } from '../Box'
import { Flex } from '../Flex'
import { LoaderIcon } from '../LoaderIcon'

import { ISuspenseImage } from './type'

export const LoaderBox = styled(Flex)`
  align-items: center;
  justify-content: center;
  padding-top: 50%;
  height: 100%;
  width: 100%;
  padding-bottom: 50%;
`

export const Wrapper = styled(Box)<{
  suspenseHeight?: string
}>`
  width: 100%;
  height: ${(props) => (props.suspenseHeight ? props.suspenseHeight : 'auto')};
`

const SuspenseImage = ({ src, alt, suspenseHeight, ...rest }: ISuspenseImage) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setIsLoading(false)
    }
    img.onerror = () => {}
  }, [src])

  return (
    <Wrapper suspenseHeight={suspenseHeight}>
      {isLoading ? (
        <LoaderBox>
          <LoaderIcon color="#14B5B1" />
        </LoaderBox>
      ) : (
        <img
          alt={alt}
          src={src}
          {...rest}
          style={{
            width: '100%',
          }}
        />
      )}
    </Wrapper>
  )
}

export default SuspenseImage
