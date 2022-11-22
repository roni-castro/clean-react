import React from 'react'
import {
  Footer,
  Input,
  LoginHeader,
  FormStatus
} from '@/presentation/components'
import Styles from './login-styles.scss'

export const Login = () => {
  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type='email' name='email' placeholder='Digite seu e-mail' />
        <Input type='password' name='password' placeholder='Digite sua senha' />
        <button className={Styles.submit} type='submit'>
          Entrar
        </button>
        <a className={Styles.link} href='#'>
          Criar conta
        </a>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}
