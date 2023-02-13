import PostFeatureItem from '../../module/post/PostFeatureItem'
import React from 'react'
import styled from 'styled-components'
import Heading from '../../components/Layout/Heading'
import { useState } from 'react'
import { useEffect } from 'react'
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase-app/firebase-config'
const HomeFeatureStyles = styled.div``

const HomeFeature = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const colRef = collection(db, 'post')
    const queries = query(
      colRef,
      // where('status', '==', 1),
      where('hot', '==', true),
      limit(3),
    )
    onSnapshot(queries, (snapshot) => {
      const result = []
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setPosts(result)
    })
  }, [])

  if (posts.length <= 0) return null
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  )
}

export default HomeFeature
