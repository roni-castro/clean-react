import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login } from '@/presentation/pages'

class Validation {
  validate() {}
}

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Login validation={new Validation()} />} />
      <Route path='/login' element={<Login validation={new Validation()} />} />
    </Routes>
  )
}
