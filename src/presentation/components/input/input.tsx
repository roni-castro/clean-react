import React, { memo } from 'react'
import Styles from './input-styles.scss'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = (props: InputProps) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.readOnly = false
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span className={Styles.status}>🔴</span>
    </div>
  )
}

export default memo(Input)
