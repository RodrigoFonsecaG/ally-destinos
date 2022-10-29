import React from 'react'
import './styles.css'

const Button = ({children, ...rest}) => {
  return (
    <button {...rest}>{children}</button>
  )
}

export default Button
