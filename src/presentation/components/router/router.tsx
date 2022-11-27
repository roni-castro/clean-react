import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationSpy } from '@/presentation/tests'

export default function Router() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Login
            validation={new ValidationSpy()}
            authentication={new AuthenticationSpy()}
          />
        }
      />
      <Route
        path='/login'
        element={
          <Login
            validation={new ValidationSpy()}
            authentication={new AuthenticationSpy()}
          />
        }
      />
    </Routes>
  )
}
