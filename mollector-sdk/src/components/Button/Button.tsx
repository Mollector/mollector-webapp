import React, { ElementType, useMemo } from 'react'

import { LoaderIcon } from '~/components/LoaderIcon'
import getExternalLinkProps from '~/utils/getExternalLinkProps'

import { StyledBorder, StyledButton } from './StyledButton'
import { ButtonProps, scales, variants } from './types'

const Button = <E extends ElementType = 'button'>(props: ButtonProps<E>): JSX.Element => {
  const { external, className, isLoading, disabled, children, scale, isBorderButton = false, ...rest } = props
  const isDisabled = isLoading || disabled
  const internalProps = external && !isDisabled ? getExternalLinkProps() : {}
  const classNames = className ? [className] : []

  const loadingSize = useMemo(() => {
    if (scale === scales.MD) {
      return {
        scale: scales.MD,
        innerScale: scales.MD,
      }
    }

    if (scale === scales.SM || scale === scales.XS) {
      return {
        scale: scales.SM,
        innerScale: scales.SM,
      }
    }
  }, [scale])

  const restProps = useMemo(() => {
    const tempRest = { ...rest }
    if (isDisabled) {
      delete tempRest.href
    }
    return tempRest
  }, [rest, isDisabled])

  if (isLoading) {
    classNames.push('mollector-button--loading')
  }

  if (isDisabled && !isLoading) {
    classNames.push('mollector-button--disabled')
  }

  if (isBorderButton) {
    return (
      <StyledBorder>
        <StyledButton
          style={{
            width: '100%',
          }}
          $isLoading={isLoading}
          scale={scale}
          className={classNames.join(' ')}
          disabled={isDisabled}
          {...internalProps}
          {...restProps}
        >
          {isLoading ? <LoaderIcon {...loadingSize} /> : <>{children}</>}
        </StyledButton>
      </StyledBorder>
    )
  }

  return (
    <StyledButton
      $isLoading={isLoading}
      scale={scale}
      className={classNames.join(' ')}
      disabled={isDisabled}
      {...internalProps}
      {...restProps}
    >
      {isLoading ? <LoaderIcon {...loadingSize} /> : <>{children}</>}
    </StyledButton>
  )
}

Button.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false,
}

export default Button
