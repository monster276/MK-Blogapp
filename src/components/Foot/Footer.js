import React from 'react'
import './Footer.css'
import styled from 'styled-components'
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from 'react-icons/ai'
import { BsPinterest } from 'react-icons/bs'

const Footer = () => {
  return (
    <div>
      <footer>
        <img src="/logo2.png" alt="" />
        <div className="topLeft flex ">
          <span className="topIcon">
            <AiFillFacebook></AiFillFacebook>
          </span>
          <span className="topIcon">
            <BsPinterest ></BsPinterest>
          </span>
          <span className="topIcon">
            <AiOutlineInstagram ></AiOutlineInstagram>
          </span>
          <span className="topIcon">
            <AiOutlineTwitter></AiOutlineTwitter>
          </span>
        </div>
        <span>
          Made with ♥️ and <b>React.js</b>.
        </span>
      </footer>
    </div>
  )
}

export default Footer
