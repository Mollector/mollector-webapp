import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Box } from '~/components/Box'

import { BreadcrumbsProps, PathProps } from './types'

const BreadcrumbsWrapper = styled(Box)`
  color: #87ceeb;
  margin-bottom: 20px;
`

const PathNavigatior = styled.span<{
  disabledRouting?: boolean
}>`
  color: ${(props) => (props.disabledRouting ? '#6c757d' : '#87ceeb')};
  &:hover {
    color: ${(props) => (props.disabledRouting ? '#6c757d' : '#077dad')};
    cursor: ${(props) => (props.disabledRouting ? 'auto' : 'pointer')};
    text-decoration: ${(props) => (props.disabledRouting ? 'none' : 'underline')};
  }
`

const PathWrapper = styled.span`
  color: #87ceeb;
  font-size: 1.4rem;
`
const Seperator = styled.span`
  margin: 0 5px;
`

const Path = ({ path, hideSeperator, disabledRouting, onChangeRoute }: PathProps) => {
  return (
    <PathWrapper
      onClick={() => {
        if (!hideSeperator && !disabledRouting) {
          onChangeRoute(path)
        }
      }}
    >
      <PathNavigatior disabledRouting={disabledRouting}>{path}</PathNavigatior>
      {!hideSeperator && <Seperator>/</Seperator>}
    </PathWrapper>
  )
}

const Breadcrumbs = ({ path, currentRoute, onChangeRoute }: BreadcrumbsProps) => {
  const generatedPath = useMemo(() => {
    const result: any[] = []

    path.forEach((p, index) => {
      result.push(<Path path={p} onChangeRoute={onChangeRoute} />)
    })

    result.push(
      <Path path={currentRoute.replace('/', '')} hideSeperator disabledRouting onChangeRoute={onChangeRoute} />,
    )

    return result
  }, [path, currentRoute])

  return <BreadcrumbsWrapper>{generatedPath}</BreadcrumbsWrapper>
}

export default Breadcrumbs
