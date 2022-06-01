import React from 'react'
import { useProviderInfo } from 'mollectorgame-sdk'
import { Redirect, Route } from 'react-router-dom'

function AuthRoute({ component: Component, ...rest }) {
  const { account } = useProviderInfo()

  if (!account) {
    return <Redirect to="/" />
  }

  return <Route render={(props) => <Component {...props} />} {...rest} />
}

export default AuthRoute
