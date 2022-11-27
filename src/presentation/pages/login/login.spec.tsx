import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { AuthenticationSpy, ValidationSpy } from '@/presentation/tests'
import { Login } from './login'

type SutType = {
  validationError: string
}

const makeSut = (params?: SutType) => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()

  const sut = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />
  )
  return { sut, validationSpy, authenticationSpy }
}

describe('Login', () => {
  it('should start with initial state', () => {
    const errorMessage = faker.random.words()
    makeSut({ validationError: errorMessage })
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
    const errorMessage = faker.random.words()
    makeSut({ validationError: errorMessage })

    await userEvent.type(screen.getByTestId('email'), 'invalid_email')

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus).toHaveTextContent('🔴')
    expect(emailStatus.title).toBe(errorMessage)
  })

  it('should show a validation error for an invalid password', async () => {
    const errorMessage = faker.random.words()
    makeSut({ validationError: errorMessage })

    await userEvent.type(screen.getByTestId('password'), '1')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveTextContent('🔴')
    expect(passwordStatus.title).toBe(errorMessage)
  })

  it('should show valid password state if Validation succeeds', async () => {
    makeSut()

    await userEvent.type(
      screen.getByTestId('password'),
      faker.internet.password()
    )

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveTextContent('🟢')
    expect(passwordStatus.title).toBe('Tudo certo')
  })

  it('should show valid email state if Validation succeeds', async () => {
    makeSut()

    await userEvent.type(screen.getByTestId('email'), faker.internet.email())

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus).toHaveTextContent('🟢')
    expect(emailStatus.title).toBe('Tudo certo')
  })

  it('should enable submit button if form is valid', async () => {
    makeSut()

    await userEvent.type(screen.getByTestId('email'), faker.internet.email())
    await userEvent.type(
      screen.getByTestId('password'),
      faker.internet.password()
    )

    expect(await screen.findByRole('button', { name: 'Entrar' })).toBeEnabled()
  })

  it('should show spinner on submit', async () => {
    makeSut()

    await userEvent.type(screen.getByTestId('email'), faker.internet.email())
    await userEvent.type(
      screen.getByTestId('password'),
      faker.internet.password()
    )
    const submitButton = await screen.findByRole('button', { name: 'Entrar' })
    await userEvent.click(submitButton)

    expect(await screen.findByTestId('login-spinner')).toBeInTheDocument()
  })

  it('should call Authentication with correct params', async () => {
    const { authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()
    await userEvent.type(screen.getByTestId('email'), email)
    await userEvent.type(screen.getByTestId('password'), password)
    const submitButton = await screen.findByRole('button', { name: 'Entrar' })
    await userEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({ email, password })
  })
})
