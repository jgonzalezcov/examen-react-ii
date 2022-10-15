import React from 'react'
import { NavLink } from 'react-router-dom'
import { ProductsContext } from '../context/ProductsProvider'
import logo from '../assets/img/logo.png'
import homeIco from '../assets/img/869432.png'
import cart from '../assets/img/carro.png'

const Navbar = () => {
  const { cartProducts } = React.useContext(ProductsContext)
  return (
    <nav>
      <img className="logo" src={logo} alt="Mamma Mia" />
      <div className="container-navbar">
        <NavLink className="btn-link" end to="/">
          <img className="ico-navlink" src={homeIco} alt="" />
          <h4 className="text-nav">Home</h4>
        </NavLink>
        <NavLink className="btn-link" end to="/carro">
          <div className="container-amount-num">
            <img className="ico-navlink" src={cart} alt="" />
            <h4 className="amount-num">{cartProducts.length}</h4>
          </div>
          <h4 className="text-nav">Carro</h4>
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
