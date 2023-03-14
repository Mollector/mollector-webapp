import React, { useState } from 'react'

import SuspenseImage from './SuspenseImage'

export default {
  title: 'Components/SuspenseImage',
  component: SuspenseImage,
  argTypes: {},
}

export const SuspenseImageComponent = () => {
  return (
    <SuspenseImage src="https://effigis.com/wp-content/uploads/2015/02/Airbus_Pleiades_50cm_8bit_RGB_Yogyakarta.jpg" />
  )
}
