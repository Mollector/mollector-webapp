import styled from 'styled-components'

import { Box } from '~/components/Box'
import { Text } from '~/components/Text'

export const StyledPackCard = styled.div<{ width: string | undefined }>`
  position: relative;
  width: ${(props) => (props.width ? props.width : 'auto')};
`

export const ContentPackCard = styled.div`
  background-color: skyblue;
  aspect-ratio: 0.95;
  margin-bottom: 15px;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    font-size: 24px;
  }
`

export const StyledCounter = styled.span`
  display: block;
  font-size: 25px;
  padding: 0 10px;
  cursor: pointer;
  color: #14b5b1;
  user-select: none;
`

export const StyledInput = styled.div`
  width: 70px;
  border: 0;
  line-height: 30px;
  font-size: 20px;
  text-align: center;
  background-color: #14b5b1;
  color: #fff;
  appearance: none;
  outline: 0;
  border-radius: 4px;
  margin: 0 10px;
`

export const Checkbox = styled.input`
  width: 26px;
  height: 26px;
  accent-color: rgba(0, 0, 0, 0.9);
  opacity: 1;
  position: absolute;
  right: 15px;
  top: 10px;
  z-index: 10;
`

export const PackInfoWrapper = styled(Box)`
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
  margin-top: 100px;
  height: 400px;
  padding-top: 65px;

  &:before {
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
`
export const PackTitle = styled(Text)`
  color: #1ea7b6;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 400;
  line-height: 27px;
`
export const PackInfo = styled(Text)`
  color: #ffffff;
  line-height: 20px;
  font-weight: 450;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
`

export const DropInfoBox = styled(Box)`
  background: #0f212c;
  border: 1px solid #225176;
  border-radius: 7px;
  width: 90%;
  text-align: center;
  padding: 5px 0px;
`

export const Divider = styled(Box)`
  width: 210px;
  height: 1px;
  margin: 12px 0px;
  background: linear-gradient(90deg, rgba(31, 83, 115, 0) 0%, #1f5373 51.56%, rgba(31, 83, 115, 0) 100%);
`

export const TokenIcon = styled.img`
  width: 34px;
  height: 34px;
`

export const PackImage = styled.img`
  position: absolute;
  top: -70px;
  width: 130px;
`
