import React from 'react'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http'
import { Login } from '@/presentation/pages'
import { ValidationBuilder, ValidationComposite } from '@/validation'

export const makeLogin = () => {
  const validation = ValidationComposite.build([
    ...ValidationBuilder.field('email').email().required().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
  const url = 'http://fordevs.herokuapp.com/api/login'
  const httpClient = new AxiosHttpClient()
  const authentication = new RemoteAuthentication(url, httpClient)
  return <Login validation={validation} authentication={authentication} />
}
