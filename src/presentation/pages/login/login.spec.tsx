import React from 'react'
import { render, screen } from '@testing-library/react'
import { Login } from './login'

describe('Login', () => {
  it('should start with initial state', () => {
    render(<Login />)

    expect(screen.queryByTestId('login-spinner')).toBeFalsy()
    expect(screen.queryByTestId('login-error')).toBeFalsy()
  })
})
