import React from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
const PostCategoriesStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  background-color: #f3f3f3;
  ${(props) =>
    props.type === 'primary' &&
    css`
      background-color: ${(props) => props.theme.grayF3};
    `};
  ${(props) =>
    props.type === 'secondary' &&
    css`
      background-color: white;
    `};
`
const PostCategories = ({ children, type = 'primary', className='', to='/' }) => {
  return (
    <PostCategoriesStyles
      className={className}
      type={type}
      classname={`post-category ${className}`}
    >
      <NavLink to={to}>{children}</NavLink>
    </PostCategoriesStyles>
  )
}

export default PostCategories
