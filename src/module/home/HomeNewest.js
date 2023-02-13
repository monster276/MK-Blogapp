import PostItem from '../../module/post/PostItem'
import PostNewestItem from '../../module/post/PostNewestItem'
import PostNewestLarge from '../../module/post/PostNewestLarge'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Heading from '../../components/Layout/Heading'
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase-app/firebase-config'
import { v4 } from 'uuid'
const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
`

const HomeNewest = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const colRef = collection(db, 'post')
    const queries = query(
      colRef,
      // where('status', '==', 1),
      where('hot', '==', false),
      limit(5),
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
  const [first, ...other] = posts
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading> Mới nhất</Heading>
        <div className="layout">
          <PostNewestLarge data={first}></PostNewestLarge>
          <div className="sidebar">
            {other.length > 0 &&
              other.map((item) => (
                <PostNewestItem data={item} key={v4()}></PostNewestItem>
              ))}
          </div>
        </div>
      </div>
    </HomeNewestStyles>
  )
}

export default HomeNewest
