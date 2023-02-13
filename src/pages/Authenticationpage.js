import React from 'react'
import styled from 'styled-components'

const AuthenticationpageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
    width: 350px;
    height: auto;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }

  .form {
    max-width: 800px;
    margin: 0 auto;
  }
  .have-account{
    margin-bottom: 20px;
    a{
        display: inline-block;
        color: ${props => props.theme.primary};
        font-weight: 500px;
    }
  }
`

const Authenticationpage = ({children}) => {
  return (
    <AuthenticationpageStyles>
      <div className="container">
        <img src="/logo2.png " alt="bloging" className="logo" />
        <h1 className="heading">Monkey Bloging</h1>
        {children}
      </div>
    </AuthenticationpageStyles>
  )
}

export default Authenticationpage
