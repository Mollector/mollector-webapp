import styled from 'styled-components'

export const StyledPackReveal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > .container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    padding: 25px;
    background: transparent;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    will-change: width, height;

    > .item {
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 5px;
      will-change: transform, opacity;
      width: 100%;
    }
  }
`
