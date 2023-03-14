import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { Handler } from '~/commonType'
import { Button } from '~/components/Button'
import { Flex } from '~/components/Flex'
import Input from '~/components/Input'
import useSignInMutation from '~/hooks/mutations/useSignInMutation'

import { setToLocalStorage } from '../MainApp/components/MarketplaceList/utils/localStorage'
import { AUTH_TOKEN } from '../MainApp/components/MarketplaceList/utils/types'

import { HLineStyled, InputWrapper, LoginWrapper, SignUpText, TitleText } from './styles'

interface ISignin {
  onLoginSuccess: Handler
}

const Signin = ({ onLoginSuccess }: ISignin) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { mutateAsync: onHandleSignIn, isLoading: isLoadingOpenPack, error } = useSignInMutation()
  const onSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Email or password is missing')
      return
    }
    const { AccessToken, PlayFabId } = await onHandleSignIn({
      email,
      password,
    })
    setToLocalStorage(AUTH_TOKEN, {
      token: AccessToken,
      playerId: PlayFabId,
    })
    onLoginSuccess()
  }

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <Flex justifyContent="center">
      <LoginWrapper onSubmit={onSignIn}>
        <SignUpText>Sign in</SignUpText>
        <HLineStyled />
        <InputWrapper mb="20px">
          <TitleText>Email</TitleText>
          <Input value={email} onChange={onChangeUserName} />
        </InputWrapper>
        <InputWrapper mb="20px">
          <TitleText>Password</TitleText>
          <Input value={password} onChange={onChangePassword} type="password" />
        </InputWrapper>
        <Button type="submit" disabled={!email || !password} isLoading={isLoadingOpenPack}>
          Log in
        </Button>
      </LoginWrapper>
    </Flex>
  )
}

export default Signin
