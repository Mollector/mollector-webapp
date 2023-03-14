import React from 'react'
import styled from 'styled-components'

const HLineStyled = styled.div`
  width: 210px;
  height: 1px;
  margin: 20px auto;
  background: linear-gradient(90deg, rgba(31, 83, 115, 0) 0%, #1f5373 51.56%, rgba(31, 83, 115, 0) 100%);
`

const HLine = () => {
  return <HLineStyled />
}

export default HLine
