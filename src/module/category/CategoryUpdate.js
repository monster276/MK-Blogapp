import React from 'react'
import DashboardHeading from '../dashboard/DashboardHeading'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Field from '../../components/field/Field'
import Label from '../../components/label/Label'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import Radio from '../../components/checkbox/Radio'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { db } from '../../firebase-app/firebase-config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { categoryStatus, userRole } from '../../utils/constants'
import { toast } from 'react-toastify'
import slugify from 'slugify'

const CategoryUpdate = () => {
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  })
  const [params] = useSearchParams()
  const categoryId = params.get('id')
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, 'categories', categoryId)
      const singleDoc = await getDoc(colRef)
      reset(singleDoc.data())
    }
    fetchData()
  }, [reset, categoryId])
  if (!categoryId) return null
  const watchStatus = watch('status')
  const handleUpdate = async (values) => {
    const colRef = doc(db, 'categories', categoryId)
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.title, { lower: true }),
      status: Number(values.status),
    })
    toast.success("Update successfully")
    navigate('/manage/category')
  }
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category: ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button disabled={isSubmitting} isLoading={isSubmitting} type="submit" kind="primary" className="mx-auto">
          Update category
        </Button>
      </form>
    </div>
  )
}

export default CategoryUpdate
