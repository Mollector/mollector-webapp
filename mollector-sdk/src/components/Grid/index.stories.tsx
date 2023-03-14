import React from 'react'

import Grid from './Grid'

export default {
  title: 'Components/Grid',
  component: Grid,
  argTypes: {},
}

export const GridComponent = () => {
  return (
    <Grid
      items={[1, 2, 3, 4]}
      settings={{
        gridGap: 40,
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'auto',
      }}
    ></Grid>
  )
}
