import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { CopyIcon } from '~/assets/icons'

import { CopyWrapper, IconWrapper } from './styles'
import { ICopy } from './types'

const Copy = ({ content, onCopy }: ICopy) => {
  return (
    <CopyWrapper>
      <CopyToClipboard text={content} onCopy={onCopy}>
        <IconWrapper>
          <CopyIcon color="primary" width="24px" />
        </IconWrapper>
      </CopyToClipboard>
    </CopyWrapper>
  )
}

export default Copy
