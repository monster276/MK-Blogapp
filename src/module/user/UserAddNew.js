import Button from '../../components/button/Button'
import Radio from '../../components/checkbox/Radio'
import { Field, FieldCheckboxes } from '../../components/field'
import { Input } from '../../components/input'
import { Label } from '../../components/label'
import DashboardHeading from '../../drafts/DashboardHeading'
import React from 'react'
import { useForm } from 'react-hook-form'
import ImageUpLoad from '../../components/Image/ImageUpload'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { userRole, userStatus } from '../../utils/constants'
import useFirebaseImage from '../../hook/useFirebaseImage'
import { auth, db } from '../../firebase-app/firebase-config'
import { addDoc, collection, serverTimestamp, setDoc } from 'firebase/firestore'
import slugify from 'slugify'
import { toast } from 'react-toastify'

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      username: '',
      avatar: '',
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date(),
    },
  })
  const watchStatus = watch('status')
  const watchRole = watch('role')
  const {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues)
  const handleCreateUser = async (values) => {
    if (!isValid) return
    await createUserWithEmailAndPassword(auth, values.email, values.password)
    try {
      await addDoc(collection(db, 'users'), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: '',
          trim: true,
        }),
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createdAt: serverTimestamp(),
      })
      toast.success('Create user with email successfully')
      reset({
        fullname: '',
        email: '',
        password: '',
        username: '',
        avatar: '',
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: new Date(),
      })
      handleResetUpload()
    } catch (error) {
      toast.error('Create fail')
    }
  }
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="w-[150px] h-[200px] rounded-full mx-auto mb-10">
          <ImageUpLoad
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image}
            className="#rounded-full h-full"
          ></ImageUpLoad>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>

              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          isLoading={isSubmitting}
          disabled={isSubmitting}
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
        >
          Add new user
        </Button>
      </form>
    </div>
  )
}

export default UserAddNew
