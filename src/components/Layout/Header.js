import React from 'react'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import { Button } from '../button'
import { NavLink } from 'react-router-dom'

import { useAuth } from '../../context/auth-context'

const menuLinks = [
  {
    url: '/',
    title: 'Home',
  },
  {
    url: '/blog',
    title: 'Blog',
  },
  {
    url: '/contact',
    title: 'Contact',
  },
]
const HeaderStyles = styled.header`
  padding: 35px 0;
  .header-main {
    display: flex;
    align-items: center;
    @media screen and (max-width: 450px) {
      display: flex;
    }
  }
  .logo {
    display: block;
    max-width: 70px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
  }

  .search {
    margin-left: auto;
    padding: 10px 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
    @media screen and (max-width: 450px) {
      display: inline-block;
    }
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
  .header-button {
    margin-left: 20px;
  }
  .header-auth {
  }
`
function getLastName(name) {
  if (!name) return 'user'
  console.log(name)
  const length = name.split('').length
  return name.split('')[length - 1]
}
const Header = () => {
  const { userInfo } = useAuth()
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img src="/logo2.png" alt="monkey bloging" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search Post"
            />
            <span className="search-icon">
              <AiOutlineSearch></AiOutlineSearch>
            </span>
          </div>
          {!userInfo ? (
            <Button
              type="button"
              className="header-button"
              height="49px"
              to="/sign-up"
            >
              Sign Up
            </Button>
          ) : (
            <div className="header-auth">
              <span>Welcome Back,</span>
              <strong className="text-primary">{userInfo?.displayName}</strong>
            </div>
          )}
          {!userInfo ? (
            <Button
              type="button"
              height="56px"
              className="header-button"
              to="/sign-in"
            >
              Login
            </Button>
          ) : (
            <div className="header-auth">
              <Button
                type="button"
                height="56px"
                className="header-button"
                to="/dashboard"
              >
                Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  )
}

export default Header
