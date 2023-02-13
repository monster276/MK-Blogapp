import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-app/firebase-config'
import styled from 'styled-components'
import Header from '../components/Layout/Header'
import HomeBanner from '../module/home/HomeBanner'
import HomeFeature from '../module/home/HomeFeature'
import Layout from '../components/Layout/Layout'
import HomeNewest from '../module/home/HomeNewest'
import Footer from '../components/Foot/Footer'
const HomePageStyles = styled.div``
const HomePage = () => {
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <br></br>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
        <Footer></Footer>
      </Layout>
    </HomePageStyles>
  )
}

export default HomePage
