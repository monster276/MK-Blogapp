import React from 'react'
import { RxEyeNone } from 'react-icons/rx'
const IconEyeClose = ({ className = '', onClick = () => {} }) => {
  return (
    <span className={className} onClick={onClick}>
      <RxEyeNone></RxEyeNone>
    </span>
  )
}

export default IconEyeClose
