import React, { memo } from 'react'
import { useLoginForm } from '@/presentation/contexts'
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
  const { state, setState } = useLoginForm()
  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.readOnly = false
  }
  const getStatus = () => '🔴'

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        onChange={handleInputChange}
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
