import React, { useState } from 'react'
import {
  Footer,
  Input,
  LoginHeader,
  FormStatus
} from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import Styles from './login-styles.scss'

export const Login = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input
            type='password'
            name='password'
            placeholder='Digite sua senha'
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
