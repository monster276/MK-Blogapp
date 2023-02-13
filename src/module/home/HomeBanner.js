import React from 'react'
import styled from 'styled-components'
import { Button } from '../../components/button'
const HomeBannerStyles = styled.div`
  min-height: 520px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );

  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-content {
      max-width: 600px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
  @media only screen and (max-width:450px) {
    
  }
`
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">My Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
              nesciunt magnam id mollitia adipisci at deleniti, libero aliquid
              quidem debitis quod itaque? Commodi dolor at blanditiis
              necessitatibus cumque culpa dignissimos!
            </p>
            <Button to="sign-up" type="button">
              Get stared
            </Button>
          </div>
          <div className="banner-image">
            <img src="/image.png" alt="" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  )
}

export default HomeBanner
