import React, { ReactNode } from 'react'

import { useForceUpdate } from '@react-spring/shared'

import { Handler } from '~/commonType'

import { getFromLocalStorage } from '../MainApp/components/MarketplaceList/utils/localStorage'
import { AUTH_TOKEN, IAuthToken } from '../MainApp/components/MarketplaceList/utils/types'

import Signin from './Signin'

interface IAuthComponent {
  children: ReactNode
  forceUpdateOutside?: Handler
}

const AuthComponent = ({ children, forceUpdateOutside = () => {} }: IAuthComponent) => {
  const authInfo = getFromLocalStorage<IAuthToken>(AUTH_TOKEN)
  const forceUpdate = useForceUpdate()

  const onForceUpdate = () => {
    forceUpdate()
    forceUpdateOutside()
  }

  if (authInfo && authInfo.token) {
    return <>{children}</>
  }

  return <Signin onLoginSuccess={onForceUpdate} />
}

export default AuthComponent
