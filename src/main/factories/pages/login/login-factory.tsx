import React from 'react'
import { Login } from '@/presentation/pages'
import { ValidationBuilder, ValidationComposite } from '@/validation'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication'

export const makeLogin = () => {
  const validation = ValidationComposite.build([
    ...ValidationBuilder.field('email').email().required().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  const authentication = makeRemoteAuthentication()
  return <Login validation={validation} authentication={authentication} />
}
