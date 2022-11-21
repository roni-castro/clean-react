import React from 'react'
import { createRoot } from 'react-dom/client'
import { Login } from '@/presentation/pages'
import '@/presentation/styles/global.scss'

const container = document.getElementById('main')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(<Login />)
