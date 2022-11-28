import { createContext, useContext } from 'react'

export type FormContextState = {
  isLoading: boolean
  isFormError: boolean
  mainError: string
  errorState: {
    email: string
    password: string
  }
  email: string
  password: string
}

type FormContextValue = {
  state: FormContextState
  setState: React.Dispatch<React.SetStateAction<FormContextState>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const FormContext = createContext<FormContextValue | null>(null)

const useLoginForm = () => {
  const context = useContext(FormContext)

  if (context == null) {
    throw new Error('useLoginForm must be used inside FormContext.Provider')
  }

  return context
}

export { FormContext, useLoginForm }
