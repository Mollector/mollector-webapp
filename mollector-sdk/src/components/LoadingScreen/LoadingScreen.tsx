import React from 'react'

import { Loading, LoadingImage, LoadingWrap } from './styles'

interface ILoadingScreen {
  isFullScreen?: boolean
}

const LoadingScreen = ({ isFullScreen = true }: ILoadingScreen) => {
  return (
    <Loading isFullScreen={isFullScreen}>
      <LoadingWrap>
        <LoadingImage />
        <span>loading...</span>
      </LoadingWrap>
    </Loading>
  )
}

export default LoadingScreen
