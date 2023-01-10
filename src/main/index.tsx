import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeLogin } from './factories/login/login-factory'

const container = document.getElementById('main')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router makeLogin={makeLogin()} />
    </BrowserRouter>
  </React.StrictMode>
)
