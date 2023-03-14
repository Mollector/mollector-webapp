import React from 'react'

import FlexComponent from './Flex'

export default {
  title: 'Components/Flex',
  component: FlexComponent,
  argTypes: {},
}

export const Flex = () => {
  return (
    <div>
      <FlexComponent>
        <div
          style={{
            width: '25%',
            backgroundColor: 'red',
          }}
        >
          1
        </div>
        <div
          style={{
            width: '25%',
            backgroundColor: 'green',
          }}
        >
          2
        </div>
        <div
          style={{
            width: '25%',
            backgroundColor: 'blue',
          }}
        >
          3
        </div>
        <div
          style={{
            width: '25%',
            backgroundColor: 'yellow',
          }}
        >
          4
        </div>
      </FlexComponent>
    </div>
  )
}
