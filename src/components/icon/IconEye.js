import React from 'react'
import { RxEyeOpen } from 'react-icons/rx'

const IconEye = ({ classname = '', onClick = () => {} }) => {
  return (
    <span className={classname} onClick={onClick}>
      <RxEyeOpen></RxEyeOpen>
    </span>
  )
}

export default IconEye
