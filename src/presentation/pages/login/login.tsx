import React, { useEffect, useState } from 'react'
import {
  Footer,
  Input,
  LoginHeader,
  FormStatus
} from '@/presentation/components'
import { FormContext, FormContextState } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols'
import { Authentication } from '@/domain/usecases'
import Styles from './login-styles.scss'

type LoginProps = {
  validation: Validation
  authentication: Authentication
}

export const Login = ({ validation, authentication }: LoginProps) => {
  const [state, setState] = useState<FormContextState>({
    isLoading: false,
    isFormError: false,
    email: '',
    password: '',
    mainError: '',
    errorState: {
      email: '',
      password: ''
    }
  })

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (state.isLoading || state.isFormError) return

    try {
      setState((old) => ({ ...old, isLoading: true }))
      const data = {
        email: state.email,
        password: state.password
      }
      const account = await authentication.auth(data)
      localStorage.setItem('accessToken', account.accessToken)
    } catch (error: any) {
      setState((old) => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

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

  useEffect(() => {
    setState((old) => ({
      ...old,
      isFormError: Boolean(state.errorState.email || state.errorState.password)
    }))
  }, [state.errorState.email, state.errorState.password])

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleOnSubmit}>
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
          <button
            disabled={state.isFormError}
            className={Styles.submit}
            type='submit'
          >
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
