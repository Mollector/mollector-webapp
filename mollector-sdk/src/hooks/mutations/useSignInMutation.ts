import get from 'lodash/get'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { useApi } from '~/widgets/MainApp/api'
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from '~/widgets/MainApp/components/MarketplaceList/utils/localStorage'
import { AUTH_TOKEN, IAuthToken } from '~/widgets/MainApp/components/MarketplaceList/utils/types'

export interface IAuthenticatedInfo {
  AccessToken: string
  AccessTokenExpireTime: number
  SessionTicket: string
  Username: string
  PlayFabId: string
}

const useSignInMutation = () => {
  const { signIn } = useApi()
  return useMutation(
    ({ email, password }: { email: string; password: string }) => {
      return signIn(email, password)
    },
    {
      onError: (e) => {
        const errMessage = get(e, 'response.data.message', 'Fail to Sign in')
        const authInfo = getFromLocalStorage<IAuthToken>(AUTH_TOKEN)
        if (authInfo) {
          removeFromLocalStorage(AUTH_TOKEN)
        }
        toast.error(errMessage)
      },
    },
  )
}

export default useSignInMutation
