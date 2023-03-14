import React from 'react'
import { capitalize } from 'lodash'

import Box from '../Box/Box'

import Button from './Button'
import { scales, variants } from './types'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
}

export const Default = () => {
  return (
    <>
      <Box mb="32px">
        <button type="button">Unstyled Button</button>
      </Box>
      <Box mb="32px">
        {Object.values(variants).map((variant) => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map((scale) => {
                return (
                  <Button
                    key={scale}
                    variant={variant}
                    scale={scale}
                    mr="8px"
                    onClick={() => {
                      console.log('test')
                    }}
                  >
                    {`${capitalize(variant)} ${scale.toUpperCase()}`}
                  </Button>
                )
              })}
            </Box>
          )
        })}
      </Box>
      <Box mb="32px">
        <Button mr="8px" disabled>
          Disabled
        </Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </Box>

      <Box>
        <Button mr="8px" isLoading>
          Loading
        </Button>
        <Button mr="8px" variant="secondary" isLoading>
          Loading
        </Button>
        <Button variant="secondary" scale={scales.SM} isLoading>
          Loading
        </Button>
      </Box>
    </>
  )
}

export const Anchors = () => {
  return (
    <>
      <Box mb="32px">
        {Object.values(variants).map((variant) => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map((scale) => {
                return (
                  <Button
                    as="a"
                    href="https://www.mollector.com/"
                    key={scale}
                    variant={variant}
                    scale={scale}
                    external
                    mr="8px"
                  >
                    {`${capitalize(variant)} anchor ${scale.toUpperCase()}`}
                  </Button>
                )
              })}
            </Box>
          )
        })}
      </Box>
      <Box>
        <Button as="a" mr="8px" external disabled>
          Disabled
        </Button>
        <Button as="a" variant="secondary" external disabled>
          Disabled
        </Button>
      </Box>
    </>
  )
}
