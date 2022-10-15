import React from 'react'
import { NavLink } from 'react-router-dom'
import notFountImg from '../assets/img/nofount.gif'

const NotFount = () => {
  return (
    <div className="container">
      <NavLink className="container-not-fount" end to="/">
        <img className="img-not-Fount" src={notFountImg} alt="" />
      </NavLink>
    </div>
  )
}

export default NotFount
