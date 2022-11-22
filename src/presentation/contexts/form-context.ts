import { createContext, useContext } from 'react'

export type FormContextState = {
  isLoading: boolean
  errorState: {
    errorMessage: string
    email: string
    password: string
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const FormContext = createContext<FormContextState | null>(null)

const useLoginForm = () => {
  const context = useContext(FormContext)

  if (context == null) {
    throw new Error('useLoginForm must be used inside FormContext.Provider')
  }

  return context
}

export { FormContext, useLoginForm }
