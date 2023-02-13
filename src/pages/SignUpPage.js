import React from 'react'
import styled from 'styled-components'
import { Input } from '../components/input'
import Label from '../components/label/Label'
import { useForm } from 'react-hook-form'
import { IconEye, IconEyeClose } from '../components/icon'
import { Field } from '../components/field'
import { useState } from 'react'
import { Button } from '../components/button'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase-app/firebase-config'
import { NavLink, useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import Authenticationpage from './Authenticationpage'
import InputPassword from '../components/input/InputPassword'
import slugify from 'slugify'
import { userRole, userStatus } from '../utils/constants'

const schema = yup.object({
  fullname: yup.string().required('Pleas enter your full name'),
  email: yup
    .string()
    .email('enter your email')
    .required('Please enter your email'),
  password: yup
    .string()
    .min(8, 'Must be 8 character ')
    .required('enter your password'),
})

const SignUpPage = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const handleSignUp = async (values) => {
    console.log(isSubmitting)
    if (!isValid) return
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
    )
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        'https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/149897/Originals/pNW6YuFJ5SqkH9V7vsKZQG-970-80_jpg%20f.png',
    })
    const colRef = collection(db, 'users')
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar:
        'https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/149897/Originals/pNW6YuFJ5SqkH9V7vsKZQG-970-80_jpg%20f.png',
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp()
    })
    await addDoc(colRef, {})
    toast.success('Create user successfully')
    navigate('/')
  }
  const [tooglePassword, setTooglePassword] = useState(false)
  useEffect(() => {
    const arrErros = Object.values(errors)
    if (arrErros.length > 0) {
      toast.error(arrErros[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      })
    }
  }, [errors])
  useEffect(() => {
    document.title = 'Register Page'
  }, [])
  return (
    <Authenticationpage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            id="fullname"
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            name="email"
            placeholder="Enter your email"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="email">Password</Label>
          <InputPassword control={control}></InputPassword>
        </Field>
        <div className="have-account">
          You aready have an account ? <NavLink to={'/sign-in'}>Login</NavLink>
        </div>
        <Button
          type="submit"
          style={{
            maxWidth: 300,
            margin: '0 auto',
            width: '100%',
          }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
          kind="primary"
        >
          Sign Up
        </Button>
      </form>
    </Authenticationpage>
  )
}

export default SignUpPage
