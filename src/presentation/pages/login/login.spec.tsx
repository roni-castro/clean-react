import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { BrowserRouter } from 'react-router-dom'
import { AuthenticationSpy, ValidationSpy } from '@/presentation/tests'
import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from './login'

type SutType = {
  validationError: string
}

const makeSut = (params?: SutType) => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()

  const sut = render(
    <BrowserRouter>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </BrowserRouter>
  )
  return { sut, validationSpy, authenticationSpy }
}

const simulateValidSubmit = async (params?: {
  email: string
  password: string
}) => {
  const email = params?.email ?? faker.internet.email()
  const password = params?.password ?? faker.internet.password()
  await userEvent.type(screen.getByTestId('email'), email)
  await userEvent.type(screen.getByTestId('password'), password)
  const submitButton = await screen.findByRole('button', { name: 'Entrar' })
  await userEvent.click(submitButton)

  return { email, password, submitButton }
}

const checkFormErrorStatus = (
  formStatus: HTMLElement,
  errorMessage: string
) => {
  expect(formStatus).toHaveTextContent('🔴')
  expect(formStatus.title).toBe(errorMessage)
}

const checkFormSuccessStatus = (
  formStatus: HTMLElement,
  successMessage: string = 'Tudo certo'
) => {
  expect(formStatus).toHaveTextContent('🟢')
  expect(formStatus.title).toBe(successMessage)
}

describe('Login', () => {
  it('should start with initial state', () => {
    const errorMessage = faker.random.words()
    makeSut({ validationError: errorMessage })
    expect(screen.queryByTestId('login-spinner')).toBeFalsy()
    expect(screen.queryByTestId('login-error')).toBeFalsy()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled()

    const emailStatus = screen.getByTestId('email-status')
    checkFormErrorStatus(emailStatus, errorMessage)

    const passwordStatus = screen.getByTestId('password-status')
    checkFormErrorStatus(passwordStatus, errorMessage)
  })

  it('should show a validation error for an invalid email', async () => {
    const errorMessage = faker.random.words()
    makeSut({ validationError: errorMessage })

    await userEvent.type(screen.getByTestId('email'), 'invalid_email')

    const emailStatus = screen.getByTestId('email-status')
    checkFormErrorStatus(emailStatus, errorMessage)
  })

  it('should show a validation error for an invalid password', async () => {
    const errorMessage = faker.random.words()
    makeSut({ validationError: errorMessage })

    await userEvent.type(screen.getByTestId('password'), '1')

    const passwordStatus = screen.getByTestId('password-status')
    checkFormErrorStatus(passwordStatus, errorMessage)
  })

  it('should show valid password state if Validation succeeds', async () => {
    makeSut()

    await userEvent.type(
      screen.getByTestId('password'),
      faker.internet.password()
    )

    const passwordStatus = screen.getByTestId('password-status')
    checkFormSuccessStatus(passwordStatus)
  })

  it('should show valid email state if Validation succeeds', async () => {
    makeSut()

    await userEvent.type(screen.getByTestId('email'), faker.internet.email())

    const emailStatus = screen.getByTestId('email-status')
    checkFormSuccessStatus(emailStatus)
  })

  it('should enable submit button if form is valid', async () => {
    makeSut()

    const { submitButton } = await simulateValidSubmit()

    await waitFor(() => expect(submitButton).toBeEnabled())
  })

  it('should show spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit()

    expect(await screen.findByTestId('login-spinner')).toBeInTheDocument()
  })

  it('should call Authentication with correct params', async () => {
    const { authenticationSpy } = makeSut()

    const { email, password } = await simulateValidSubmit()

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('should call Authentication login only once', async () => {
    const { authenticationSpy } = makeSut()

    const { submitButton } = await simulateValidSubmit()
    await userEvent.click(submitButton)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call Authentication if form is invalid', async () => {
    const { authenticationSpy } = makeSut({
      validationError: faker.random.words()
    })

    await userEvent.type(screen.getByTestId('email'), faker.internet.email())
    const submitButton = await screen.findByRole('button', { name: 'Entrar' })
    await userEvent.click(submitButton)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should show error and hide spinner if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

    await simulateValidSubmit()

    expect(await screen.findByTestId('login-error')).toHaveTextContent(
      error.message
    )
    expect(screen.queryByTestId('login-spinner')).not.toBeInTheDocument()
  })

  it('should save accessToken to localStorage on authentication success', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidSubmit()

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken
    )
  })

  it('should go to sign up page', async () => {
    makeSut()

    const signUpLink = screen.getByTestId('signUp')
    await userEvent.click(signUpLink)

    expect(window.location.pathname).toEqual('/signup')
  })
})
