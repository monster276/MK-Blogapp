import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Heading from '../components/Layout/Heading'
import Layout from '../components/Layout/Layout'
import { db } from '../firebase-app/firebase-config'
import PostItem from '../module/post/PostItem'

const CategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  console.log(params.slug)
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "post"),
        where("category.slug", "==", params.slug)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log(results)
        setPosts(results);
      });
    }
    fetchData();
  }, [params.slug]);
  // if (posts.length <= 0) return null;
  return (
    <Layout>
      <div className="container">
        <div className="pt-10"></div>
        <Heading>Danh mục {params.slug}</Heading>
        <div className="grid-layout grid-layout--primary">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;