import React from 'react'
import Styles from './spinner-styles.scss'

type SpinnerProps = React.HTMLAttributes<HTMLElement>

const Spinner = ({ className, ...props }: SpinnerProps) => (
  <div {...props} className={[className, Styles.spinner].join(' ')}>
    <div />
    <div />
    <div />
    <div />
  </div>
)

export default Spinner
