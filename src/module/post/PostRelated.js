import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Heading from '../../components/Layout/Heading'
import { db } from '../../firebase-app/firebase-config'
import PostItem from './PostItem'

const PostRelated = ({ categoryname = '' }) => {
  console.log(categoryname)
  const [post, setPost] = useState([])
  useEffect(() => {
    const docRef = query(
      collection(db, 'post'),
      where('category.name', '==', categoryname),
      
    )
    onSnapshot(docRef, (snapshot) => {
      const results = []
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        })
        console.log(results)
      })
      setPost(results)
    })
  }, [categoryname])
  // if (!categoryname || !post.length <= 0) return null
  console.log(post.length)
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan </Heading>
      <div className="grid-layout grid-layout--primary">
        {post.map((item) => (
          <PostItem key={item.id} data={item}></PostItem>
        ))}
      </div>
    </div>
  )
}

export default PostRelated
