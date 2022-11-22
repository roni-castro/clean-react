import React from 'react'
import { LoginHeader, Spinner } from '@/presentation/components'
import Styles from './login-styles.scss'

export const Login = () => {
  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type='email' name='email' placeholder='Email' />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type='password' name='password' placeholder='Password' />
          <span className={Styles.status}>🔴</span>
        </div>
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
      <footer className={Styles.footer} />
    </div>
  )
}
