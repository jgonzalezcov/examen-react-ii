import React from 'react'
import { useState } from 'react'
import CarouselImg from '../components/CarouselImg'
import { ProductsContext } from '../context/ProductsProvider'
import { useNavigate } from 'react-router-dom'
const productImage = require.context('../assets/img', true)
const Home = () => {
  const navigate = useNavigate()
  const { products, cartProducts, setcartProducts } =
    React.useContext(ProductsContext)
  const [viewAdd, setViewAdd] = useState('')
  const [sizeAdd, setSizeAdd] = useState('Grande')
  const [thicknessAdd, setThicknessAdd] = useState('Normal')
  const [sauce, setSauce] = useState('Con Salsa de Tomate')
  const [amount, setAmount] = useState(1)
  const [priceProduct, setpriceProduct] = useState(0)
  const [idCart, setIdCart] = useState(1)
  const add = (p) => {
    setViewAdd(p.id)
    setSizeAdd('Grande')
    setpriceProduct(p.prices[1].price)
    setThicknessAdd('Normal')
    setSauce('Con Salsa de Tomate')
    setAmount(1)
    if (cartProducts.length === false) {
      setIdCart(0)
    } else {
      setIdCart(cartProducts.length + 1)
    }
  }

  const selectSize = (sizeData, priceData) => {
    setSizeAdd(sizeData)
    setpriceProduct(priceData)
  }
  const addCart = (element) => {
    if (
      cartProducts.filter(
        (e) =>
          e.idProduct === element.id &&
          e.size === sizeAdd &&
          e.thicknessAdd === thicknessAdd &&
          e.sauce === sauce
      ).length > 0
    ) {
      setcartProducts((current) =>
        current.map((obj) => {
          if (obj.idProduct === element.id) {
            return { ...obj, amount: obj.amount * 1 + amount * 1 }
          }
          return obj
        })
      )
    } else if (
      cartProducts.filter(
        (e) =>
          e.idProduct === element.id &&
          e.size === sizeAdd &&
          e.thicknessAdd === thicknessAdd &&
          e.sauce === sauce
      ).length === 0
    ) {
      setcartProducts([
        ...cartProducts,
        {
          id: idCart,
          idProduct: element.id,
          name: element.name,
          size: sizeAdd,
          thicknessAdd: thicknessAdd,
          sauce: sauce,
          amount: amount,
          price: priceProduct,
        },
      ])
    }
    setViewAdd('')
  }

  const addCancel = (pId) => {
    setViewAdd('')
    setSizeAdd('Grande')
    setThicknessAdd('Normal')
    setSauce('Con Salsa de Tomate')
    setAmount(1)
  }
  return (
    <div className="home-container">
      <CarouselImg />
      <div className="card-container">
        {products.map((p) => (
          <div
            key={p.id}
            className="card"
            style={{
              backgroundImage: `url(${productImage(p.img)})`,
            }}
          >
            {viewAdd === p.id ? (
              <div className="add-product">
                <h4 className="add-name">Elije la base de tu pizza</h4>
                <div className="add-select">
                  <h4 className="add-option">Tamaño</h4>

                  <div className="container-add-options">
                    <button
                      onClick={() => selectSize('Grande', p.prices[1].price)}
                      className={
                        sizeAdd === 'Grande'
                          ? 'bt-type  bt-type-select'
                          : 'bt-type'
                      }
                    >
                      Grande
                    </button>
                    <button
                      onClick={() => selectSize('Mediana', p.prices[0].price)}
                      className={
                        sizeAdd === 'Mediana'
                          ? 'bt-type  bt-type-select'
                          : 'bt-type'
                      }
                    >
                      Mediana
                    </button>
                  </div>

                  <h4 className="add-option">Tipo de masa</h4>

                  <div className="container-add-options">
                    <button
                      onClick={() => setThicknessAdd('Normal')}
                      className={
                        thicknessAdd === 'Normal'
                          ? 'bt-type  bt-type-select'
                          : 'bt-type'
                      }
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => setThicknessAdd('Delgada')}
                      className={
                        thicknessAdd === 'Delgada'
                          ? 'bt-type  bt-type-select'
                          : 'bt-type'
                      }
                    >
                      Delgada
                    </button>
                  </div>

                  <h4 className="add-option">Salsa de tomate</h4>

                  <div className="container-add-options">
                    <button
                      onClick={() => setSauce('Con Salsa de Tomate')}
                      className={
                        sauce === 'Con Salsa de Tomate'
                          ? 'bt-type  bt-type-select'
                          : 'bt-type'
                      }
                    >
                      Si
                    </button>
                    <button
                      onClick={() => setSauce('Sin Salsa de Tomate')}
                      className={
                        sauce === 'Sin Salsa de Tomate'
                          ? 'bt-type  bt-type-select'
                          : 'bt-type'
                      }
                    >
                      No
                    </button>
                  </div>

                  <h4 className="add-option">Cantidad</h4>

                  <div className="container-add-options">
                    <input
                      className="amount"
                      value={amount}
                      type="number"
                      min="1"
                      onChange={(e) => {
                        setAmount(e.target.value)
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="info-pizza">
              <h3 className="name-pizza">{p.name}</h3>
              <div className="container-ingredients">
                {p.ingredients.map((i, index) => (
                  <h4 className="ingredients" key={index}>
                    {i}
                  </h4>
                ))}
              </div>
              <div className="container-price">
                {p.prices.map((v) => (
                  <div className="price-value" key={v.id}>
                    <div className="container-size-info">
                      <h3 className="size-info">{v.size}:</h3>
                    </div>
                    <div className="container-price-info">
                      <h3 className="price-info">
                        ${v.price.toLocaleString('de-DE')}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="conaiter-btn-add">
                {viewAdd !== p.id ? (
                  <div className="container-btn-add-cart">
                    <button className="btn-add" onClick={() => add(p)}>
                      Agregar
                    </button>
                    <button
                      className="btn-detail"
                      onClick={() => navigate(`/product/${p.id}`)}
                    >
                      Ver Descripción
                    </button>
                  </div>
                ) : (
                  <div className="container-btn-add-cart">
                    <button
                      className="btn-add btn-add-cart"
                      onClick={() => addCart(p)}
                    >
                      Agregar al carrito
                    </button>

                    <button
                      className="btn-add btn-add-cancel"
                      onClick={() => addCancel(p)}
                    >
                      Regresar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
