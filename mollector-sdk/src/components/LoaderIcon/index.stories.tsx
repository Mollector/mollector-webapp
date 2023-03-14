import React from 'react'

import LoaderIconComponent from './LoaderIcon'
import { scales } from './types'

export default {
  title: 'Components/LoaderIcon',
  component: LoaderIconComponent,
  argTypes: {},
}

export const LoaderIcon = () => {
  return (
    <div>
      <LoaderIconComponent color="red" scale={scales.SM} innerScale={scales.SM} />
      <LoaderIconComponent color="green" />
    </div>
  )
}
