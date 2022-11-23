import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { Validation } from '@/presentation/protocols'
import { Login } from './login'

class ValidationSpy implements Validation {
  input?: object
  errorMessage?: string

  validate(input: object) {
    this.input = input

    return this.errorMessage
  }
}

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

  it('should call Validation with correct email', async () => {
    const { validationSpy } = makeSut()
    const email = faker.internet.email()
    const emailInput = screen.getByTestId('email')

    await userEvent.type(emailInput, email)

    expect(validationSpy.input).toEqual({ email, password: '' })
  })

  it('should call Validation with correct password', async () => {
    const { validationSpy } = makeSut()
    const password = faker.internet.password()
    const passwordInput = screen.getByTestId('password')

    await userEvent.type(passwordInput, password)

    expect(validationSpy.input).toEqual({ email: '', password })
  })
})
