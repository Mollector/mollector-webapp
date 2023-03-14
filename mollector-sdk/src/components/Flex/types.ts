import { HTMLAttributes } from 'react'
import { FlexboxProps } from 'styled-system'

import { BoxProps } from '~/components/Box/types'

export interface FlexProps extends HTMLAttributes<HTMLDivElement>, FlexboxProps, BoxProps {}
