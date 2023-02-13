import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../../components/button'
import { Radio } from '../../components/checkbox'
import { Dropdown } from '../../components/dropdown'
import { Field, FieldCheckboxes } from '../../components/field'
import ImageUpload from '../../components/Image/ImageUpload'
import { Input } from '../../components/input'
import { Label } from '../../components/label'
import Toggle from '../../components/Toggle/Toggle'
import { db } from '../../firebase-app/firebase-config'
import useFirebaseImage from '../../hook/useFirebaseImage'
import { postStatus } from '../../utils/constants'
import DashboardHeading from '../dashboard/DashboardHeading'
import { toast } from 'react-toastify'
import ImageUploader from 'quill-image-uploader'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useMemo } from 'react'
import axios from 'axios'
import slugify from 'slugify'

Quill.register('modules/imageUploader', ImageUploader)
const PostUpdate = () => {
  const {
    formState: { isSubmitting, isValid },
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    getValues,
  } = useForm({
    mode: 'onChange',
  })
  const imageUrl = getValues('image')
  const imageName = getValues('image_name')
  const {
    image,
    setImage,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageName, deletePostImage)
  async function deletePostImage() {
    const colRef = doc(db, 'post', postId)
    await updateDoc(colRef, {
      avatar: '',
    })
  }
  useEffect(() => {
    setImage(imageUrl)
  }, [imageUrl, setImage])
  const watchHot = watch('hot')
  const watchStatus = watch('status')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState([])
  const [selectCategory, setSelectCategory] = useState('')

  useEffect(() => {
    async function getCategoriesData() {
      const colRef = collection(db, 'categories')
      const q = query(colRef, where('status', '==', 1))
      const querySnapshot = await getDocs(q)
      let result = []
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setCategories(result)
    }
    getCategoriesData()
  }, [])
  const handleClickOption = async (item) => {
    const colRef = doc(db, 'categories', item.id)
    const docData = await getDoc(colRef)
    setValue('category', {
      id: docData.id,
      ...docData.data(),
    })
    setSelectCategory(item)
  }
  const [params] = useSearchParams()
  const postId = params.get('id')

  const updatePostHandler = async (values) => {
    values.status = Number(values.status)
    values.slug = slugify(values.slug || values.title, { lower: true })

    if (!isValid) return
    const docRef = doc(db, 'post', postId)
    await updateDoc(docRef, {
      ...values,
      content,
    })
    toast.success('Update post success')
  }
  useEffect(() => {
    async function fetchData() {
      if (!postId) return
      const docRef = doc(db, 'post', postId)
      const docSnapshot = await getDoc(docRef)
      if (docSnapshot.data()) {
        reset(docSnapshot.data())
        setSelectCategory(docSnapshot.data()?.category || '')
        setContent(docSnapshot.data()?.content || '')
      }
    }
    fetchData()
  }, [postId, reset])
  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image'],
      ],
      imageUploader: {
        // imgbbAPI
        upload: async (file) => {
          console.log('upload: ~ file', file)
          const bodyFormData = new FormData()
          console.log('upload: ~ bodyFormData', bodyFormData)
          bodyFormData.append('image', file)
          const response = await axios({
            method: 'post',
            url:
              'https://api.imgbb.com/1/upload?key=8b4d75c105566382fe4d7e3efb57e020',
            data: bodyFormData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          return response.data.data.url
        },
      },
    }),
    [],
  )

  if (!postId) return null
  return (
    <>
      <DashboardHeading
        title="Update post"
        desc={`Update post: ${postId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(updatePostHandler)}>
        <div className="form-layout">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 rounded-lg bg-green-50 text-sm text-green-600 font-medium">
                {selectCategory?.name}
              </span>
            )}
          </Field>
          <div className="mb-10">
            <Field>
              <Label>Content</Label>
              <div className="w-full entry-content">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                />
              </div>
            </Field>
          </div>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue('hot', !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECT}
                value={postStatus.REJECT}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update post
        </Button>
      </form>
    </>
  )
}

export default PostUpdate
