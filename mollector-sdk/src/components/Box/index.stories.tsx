import React from 'react'

import BoxComponent from './Box'

export default {
  title: 'Components/Box',
  component: BoxComponent,
  argTypes: {},
}

export const Box = () => {
  return (
    <div>
      <BoxComponent as="p">Contains background, border, layout, position and space from Styled System</BoxComponent>
    </div>
  )
}
