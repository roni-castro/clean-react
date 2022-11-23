import React, { useEffect, useState } from 'react'
import {
  Footer,
  Input,
  LoginHeader,
  FormStatus
} from '@/presentation/components'
import { FormContext, FormContextState } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols'
import Styles from './login-styles.scss'

type LoginProps = {
  validation: Validation
}

export const Login = ({ validation }: LoginProps) => {
  const [state, setState] = useState<FormContextState>({
    isLoading: false,
    email: '',
    password: '',
    errorState: {
      email: '',
      password: '',
      main: ''
    }
  })

  const validate = (fieldName: string, fieldValue: string) => {
    setState((old) => ({
      ...old,
      errorState: {
        ...old.errorState,
        [fieldName]: validation.validate({
          fieldName,
          fieldValue
        })
      }
    }))
  }

  useEffect(() => {
    validate('password', state.password)
    validate('email', state.email)
  }, [state.email, state.password])

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input
            data-testid='email'
            type='email'
            name='email'
            placeholder='Digite seu e-mail'
            errorMessage={state.errorState.email}
          />
          <Input
            data-testid='password'
            type='password'
            name='password'
            placeholder='Digite sua senha'
            errorMessage={state.errorState.password}
          />
          <button disabled className={Styles.submit} type='submit'>
            Entrar
          </button>
          <a className={Styles.link} href='#'>
            Criar conta
          </a>
          <FormStatus data-testid='login' />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
