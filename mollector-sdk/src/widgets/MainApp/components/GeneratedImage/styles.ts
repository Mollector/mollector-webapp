import styled from 'styled-components'

import { Box } from '~/components/Box'
import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'

export const Wrapper = styled(Box)<{
  isLoading: boolean
}>`
  aspect-ratio: 0.648;
  position: relative;
  display: ${({ isLoading }) => (isLoading ? 'none' : 'flex')};
  justify-content: center;
  margin-bottom: 25px;
`
export const BaseImage = styled.img`
  position: absolute;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  user-drag: none;
`
export const BaseText = styled(Text)`
  font-family: Calistoga;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const EffectImage = styled(BaseImage)`
  top: 0%;
  z-index: 4;
  width: 100%;
  height: 100%;
`

export const BackgroundImage = styled(BaseImage)`
  top: 0%;
  z-index: 1;
  width: 100%;
  height: 100%;
`

export const CharImage = styled(BaseImage)`
  top: 0%;
  z-index: 3;
  width: 100%;
  height: 100%;
`

export const FrameBackImage = styled.img`
  width: 100%;
  z-index: 2;
`

export const FrameBottomImage = styled(BaseImage)`
  width: 100%;
  bottom: -13px;
  left: 0px;
  z-index: 5;
`

export const FrameInnerImage = styled(BaseImage)`
  left: 0px;
  width: 100%;
  z-index: 2;
`

export const RaceImage = styled(BaseImage)`
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 2;
`

export const RaceSmallImage = styled(BaseImage)`
  z-index: 1;
  bottom: 0px;
  position: absolute;
  z-index: 6;
`

export const FrameEliteImage = styled(BaseImage)`
  left: 13px;
  top: 6px;
  width: 60%;
  z-index: 2;
`

export const AttackIcon = styled(BaseImage)`
  width: 100%;
`

export const HPIcon = styled(BaseImage)`
  width: 100%;
`

export const StarWrapper = styled(Flex)`
  position: absolute;
  top: 61.5%;
  justify-content: center;
  width: 100%;
  z-index: 6;
`

export const StarOffImage = styled.img`
  width: 7%;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  user-drag: none;
`

export const NameText = styled(BaseText)`
  position: absolute;
  top: 69%;
  color: white;
  font-size: 22px;
  font-weight: 800;
  text-shadow: 2px 2px #000, -2px 2px #000, 2px -2px #000, -2px -2px #000, 2px 2px 0px #000;
  z-index: 6;
`

export const RaceSmallText = styled(BaseText)`
  z-index: 2;
  bottom: 2.5%;
  position: absolute;
  color: white;
  font-size: 14px;
  font-weight: 800;
  z-index: 7;
  text-shadow: 1px 1px #000, -1px 1px #000, 1px -1px #000, -1px -1px #000, 1px 1px 0px #000;
`

export const RarityImage = styled(BaseImage)`
  z-index: 3;
  width: 90px;
`

export const HeroWrapper = styled(Flex)`
  position: absolute;
  top: 0%;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`
export const DescriptionText = styled(BaseText)`
  color: black;
  font-weight: 800;
  font-size: 12px;
  position: absolute;
  text-align: center;
  top: 79%;
  margin: 0 30px;
  z-index: 6;
`

export const AttackIconWrapper = styled(Box)`
  left: -23px;
  position: absolute;
  bottom: 20px;
  width: 25%;
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const HpIconWrapper = styled(Box)`
  right: -23px;
  position: absolute;
  bottom: 20px;
  width: 25%;
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StatText = styled(BaseText)`
  font-weight: 800;
  font-size: 34px;
  position: absolute;
  text-shadow: 1px 1px #000, -1px 1px #000, 1px -1px #000, -1px -1px #000, 1px 1px 0px #000;
  color: white;
`
export const LoaderBox = styled(Flex)`
  align-items: center;
  justify-content: center;
  padding-top: 50%;
  aspect-ratio: 0.648;
  margin-bottom: 25px;
  padding-bottom: 50%;
`
