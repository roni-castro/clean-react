import React, { memo } from 'react'
import Styles from './input-styles.scss'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  'data-testid'?: string
  errorMessage?: string
}

const Input = ({
  'data-testid': dataTestId = 'input',
  errorMessage,
  ...props
}: InputProps) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.readOnly = false
  }
  const getStatus = () => '🔴'

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        data-testid={`${dataTestId}`}
        readOnly
        onFocus={enableInput}
      />
      <span
        title={errorMessage}
        data-testid={`${dataTestId}-status`}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  )
}

export default memo(Input)
