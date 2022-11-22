import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login } from '@/presentation/pages'

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
