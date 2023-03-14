import styled from 'styled-components'

import { Box } from '~/components/Box'
import { Text } from '~/components/Text'

// repeat(auto-fill, minmax(250px, 1fr))

export const StyledPackReveal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Container = styled(Box)`
  position: relative;
  justify-content: center;
  display: flex;
  grid-gap: 35px;
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  will-change: width, height;
  flex-wrap: wrap;
`

export const Item = styled(Box)`
  width: 18%;
  min-width: 290px;
  height: auto;
  background: transparent;
  border-radius: 5px;
  will-change: transform, opacity;
`

export const StyledText = styled(Text)`
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  font-weight: 400;
  color: #f8c159;
`

export const HLine = styled(Box)`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(95, 207, 232, 0) 0%, #27767a 53.65%, rgba(95, 207, 232, 0) 100%);
`

export const Wrapper = styled(Box)`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 30px 0px;
  padding: 25px;
  width: 100%;
`

export const PackTitle = styled(Text)`
  font-weight: 400;
  font-family: UTMGod;
  color: #ffffff;
  font-size: 30px;
  margin-bottom: 10px;
`

export const PackId = styled(Text)`
  font-size: 18px;
  color: #f8c159;
`
