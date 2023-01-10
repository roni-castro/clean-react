import React from 'react'
import { Routes, Route } from 'react-router-dom'

type RouterProps = {
  makeLogin: JSX.Element
}

export default function Router({ makeLogin }: RouterProps) {
  return (
    <Routes>
      <Route path='/' element={makeLogin} />
      <Route path='/login' element={makeLogin} />
    </Routes>
  )
}
