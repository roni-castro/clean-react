import React from 'react'
import { Spinner } from '@/presentation/components'
import { useLoginForm } from '@/presentation/contexts'
import Styles from './form-status-styles.scss'

type FormStatusProps = {
  'data-testid': string
}

const FormStatus = ({
  'data-testid': dataTestId,
  ...props
}: FormStatusProps) => {
  const { state } = useLoginForm()

  return (
    <div className={Styles.errorWrap} {...props}>
      {state.isLoading && (
        <Spinner
          data-testid={`${dataTestId}-spinner`}
          className={Styles.spinner}
        />
      )}
      {state.mainError ? (
        <span data-testid={`${dataTestId}-error`} className={Styles.error}>
          {state.mainError}
        </span>
      ) : null}
    </div>
  )
}

export default FormStatus
