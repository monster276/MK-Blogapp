import React from 'react'
import { Button } from '../../components/button'
import { LabelStatus } from '../../components/label'
import { Table } from '../../components/table'
import DashboardHeading from '../dashboard/DashboardHeading'
import { ActionView, ActionEdit, ActionDelete } from '../../components/action'
import { useState } from 'react'
import { useEffect } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase-app/firebase-config'
import { categoryStatus } from '../../utils/constants'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'
import { useRef } from 'react'
const CATEGORY_PER_PAGE = 2

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([])
  const [filter, setFiler] = useState('')
  const [categoryCount, setCategorycount] = useState(0)
  const [lastDoc, setLastDoc] = useState()
  const [total, setTotal] = useState(0)

  const handleLoadMore = async () => {
    const nextRef = query(
      collection(db, 'categories'),
      startAfter(lastDoc),
      limit(CATEGORY_PER_PAGE),
    )
    onSnapshot(nextRef, (snapShot) => {
      let results = []
      setCategorycount(Number(snapShot.size))
      snapShot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setCategoryList([...categoryList, ...results])
    })
    const documentSnapshots = await getDocs(nextRef)
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1]
    setLastDoc(lastVisible)
  }
  const handleInputFilter = debounce((e) => {
    setFiler(e.target.value)
  }, 500)
  const handleDeleteCategory = async (docId) => {
    const colRef = doc(db, 'categories', docId)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef)
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, 'categories')
      const newRef = filter
        ? query(
            colRef,
            where('name', '>=', filter),
            where('name', '<=', filter + 'utf8'),
          )
        : query(colRef, limit(CATEGORY_PER_PAGE))
      const documentSnapshots = await getDocs(newRef)
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1]
      setLastDoc(lastVisible)
      onSnapshot(colRef, (snapShot) => {
        setTotal(snapShot.size)
      })
      onSnapshot(newRef, (snapShot) => {
        let results = []
        setCategorycount(Number(snapShot.size))
        snapShot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setCategoryList(results)
      })
    }
    fetchData()
  }, [filter])

  const navigate = useNavigate()
  return (
    <div>
      <DashboardHeading
        title="Categories"
        desc="Manage your Categories"
      ></DashboardHeading>
      <Button kind="ghost" height="60px" to="/manage/add-category">
        Create category
      </Button>
      <div className="mb-10 flex justify-end">
        <input
          className="py-4 px-5 border-gray-300 rounded-lg outline-none"
          type="text"
          placeholder="Search category"
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic text-gray-400">{category.slug}</span>
                </td>
                <td>
                  {Number(category.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {Number(category.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total >= categoryList.length && (
        <div className="mt-10">
          <Button className="mx-auto" onClick={handleLoadMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}

export default CategoryManage
