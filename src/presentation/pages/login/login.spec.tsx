import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { ValidationSpy } from '@/presentation/tests'
import { Login } from './login'

const makeSut = () => {
  const validationSpy = new ValidationSpy()
  const errorMessage = faker.random.words()
  validationSpy.errorMessage = errorMessage

  const sut = render(<Login validation={validationSpy} />)
  return { sut, validationSpy, errorMessage }
}

describe('Login', () => {
  it('should start with initial state', () => {
    const { errorMessage } = makeSut()
    expect(screen.queryByTestId('login-spinner')).toBeFalsy()
    expect(screen.queryByTestId('login-error')).toBeFalsy()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus).toHaveTextContent('🔴')
    expect(emailStatus.title).toBe(errorMessage)

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveTextContent('🔴')
    expect(passwordStatus.title).toBe(errorMessage)
  })

  it('should show a validation error for an invalid email', async () => {
    const { errorMessage } = makeSut()

    await userEvent.type(screen.getByTestId('email'), 'invalid_email')

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus).toHaveTextContent('🔴')
    expect(emailStatus.title).toBe(errorMessage)
  })

  it('should show a validation error for an invalid password', async () => {
    const { errorMessage } = makeSut()

    await userEvent.type(screen.getByTestId('password'), '1')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveTextContent('🔴')
    expect(passwordStatus.title).toBe(errorMessage)
  })

  it('should show valid password state if Validation succeeds', async () => {
    const { validationSpy } = makeSut()
    validationSpy.errorMessage = ''
    await userEvent.type(
      screen.getByTestId('password'),
      faker.internet.password()
    )

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveTextContent('🟢')
    expect(passwordStatus.title).toBe('Tudo certo')
  })

  it('should show valid email state if Validation succeeds', async () => {
    const { validationSpy } = makeSut()
    validationSpy.errorMessage = ''
    await userEvent.type(screen.getByTestId('email'), faker.internet.email())

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus).toHaveTextContent('🟢')
    expect(emailStatus.title).toBe('Tudo certo')
  })
})
