import React from 'react'
import { Login } from '@/presentation/pages'
import { makeLoginValidation } from './login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication'

export const makeLogin = () => {
  const validation = makeLoginValidation()
  const authentication = makeRemoteAuthentication()
  return <Login validation={validation} authentication={authentication} />
}
