import React, { Fragment } from 'react'
import { useState } from 'react'
import { IconEye, IconEyeClose } from '../icon'
import Input from './Input'

const InputPassword = ({ control }) => {
  const [tooglePassword, setTooglePassword] = useState(false)
  if (!control) return null
  return (
    <Fragment>
      <Input
        id="password"
        type={tooglePassword ? 'text' : 'password'}
        name="password"
        placeholder="Enter your password"
        control={control}
      >
        {!tooglePassword ? (
          <IconEyeClose onClick={() => setTooglePassword(true)}></IconEyeClose>
        ) : (
          <IconEye onClick={() => setTooglePassword(false)}></IconEye>
        )}
      </Input>
    </Fragment>
  )
}

export default InputPassword
