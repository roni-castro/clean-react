import React from 'react'
import { Footer, Input, LoginHeader, Spinner } from '@/presentation/components'
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
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}
