import { Handler } from '~/commonType'
import { LoginModuleType } from '~/widgets/LoginModule'

export interface LoginModalProps extends LoginModuleType {
  isOpen: boolean
  onHandleClose: Handler
}

export interface LogoutModalProps extends LoginModuleType {
  isOpen: boolean
  onHandleClose: Handler
}
