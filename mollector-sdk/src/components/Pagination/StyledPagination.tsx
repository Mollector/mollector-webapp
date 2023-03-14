import styled from 'styled-components'

export const PaginationContainer = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
`

export const PaginationItem = styled.li<{ disabled?: boolean; dots?: boolean; selected?: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto 4px;
  color: ${(props) => (props.selected ? '#fff' : '#DAB877')};
  display: flex;
  box-sizing: border-box;
  align-items: center;
  transition: all 0.2s ease-out;
  letter-spacing: 0.01071em;
  border-radius: 6px;
  font-size: 16px;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  // background-color: ${(props) => (props.selected ? '#FF9F43' : 'transparent')};

  &:hover {
    cursor: ${(props) => (props.dots || props.disabled ? 'default' : 'pointer')};
    color: #fff;
    background-color: ${(props) => {
      if (props.dots) {
        return 'transparent'
      }
      if (props.disabled) {
        return '#e0e0e0'
      }
      return '#FF9F43'
    }};

    > .arrow {
      &::before {
        border-right: 2px solid #271403;
        border-top: 2px solid #271403;
      }
    }
  }

  > .arrow {
    &::before {
      position: relative;
      /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
      content: '';
      /* By using an em scale, the arrows will size with the font */
      display: inline-block;
      width: 0.6em;
      height: 0.6em;

      border-right: 2px solid #dab877;
      border-top: 2px solid #dab877;
    }

    &.left {
      transform: rotate(-135deg) translate(-2px, 1px);
    }

    &.right {
      transform: rotate(45deg) translate(-2px, 1px);
    }
  }
`
