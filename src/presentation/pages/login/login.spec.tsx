import React from 'react'
import { render, screen } from '@testing-library/react'
import { ValidationSpy } from '@/presentation/tests'
import { Login } from './login'

const makeSut = () => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  return { sut, validationSpy }
}

describe('Login', () => {
  it('should start with initial state', () => {
    makeSut()
    expect(screen.queryByTestId('login-spinner')).toBeFalsy()
    expect(screen.queryByTestId('login-error')).toBeFalsy()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus).toHaveTextContent('🔴')
    expect(emailStatus.title).toBe('Campo obrigatório')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveTextContent('🔴')
    expect(passwordStatus.title).toBe('Campo obrigatório')
  })
})
