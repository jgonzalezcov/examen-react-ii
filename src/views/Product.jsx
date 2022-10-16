import React from 'react'
import { useState } from 'react'
import { ProductsContext } from '../context/ProductsProvider'
import { useParams } from 'react-router-dom'
const productImage = require.context('../assets/img', true)
const Product = () => {
  const { products, cartProducts, setcartProducts } =
    React.useContext(ProductsContext)
  const { id } = useParams()
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
    <div className="container-product">
      {products
        .filter((p) => p.id === id)
        .map((e) => (
          <div className="container-description" key={e.id}>
            <div className="container-left">
              <div
                className="img-description"
                style={{
                  backgroundImage: `url(${productImage(e.img)})`,
                }}
              >
                {' '}
                {viewAdd === e.id ? (
                  <div className="add-product-description">
                    <h4 className="add-name-description">
                      Elije la base de tu pizza
                    </h4>
                    <div className="add-select">
                      <h4 className="add-option">Tamaño</h4>

                      <div className="container-add-options">
                        <button
                          onClick={() =>
                            selectSize('Grande', e.prices[1].price)
                          }
                          className={
                            sizeAdd === 'Grande'
                              ? 'bt-type  bt-type-select'
                              : 'bt-type'
                          }
                        >
                          Grande
                        </button>
                        <button
                          onClick={() =>
                            selectSize('Mediana', e.prices[0].price)
                          }
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
                    <div className="container-btn-add-cart">
                      <button
                        className="btn-add btn-add-cart"
                        onClick={() => addCart(e)}
                      >
                        Agregar al carrito
                      </button>

                      <button
                        className="btn-add btn-add-cancel"
                        onClick={() => addCancel()}
                      >
                        Regresar
                      </button>
                    </div>
                  </div>
                ) : (
                  ''
                )}{' '}
              </div>
            </div>
            <div className="container-center">
              <div className="container-title-btn">
                <h4 className="name-description">{e.name}</h4>
                {viewAdd === '' ? (
                  <button className="btn-add-d" onClick={() => add(e)}>
                    Agregar
                  </button>
                ) : (
                  ''
                )}
              </div>
              <h4 className="title-description">Descripción:</h4>
              <h4 className="description">{e.desc}</h4>

              <h4 className="ingredient">Ingredientes:</h4>
              <ul className="description-list-ingredients">
                {e.ingredients.map((i, index) => (
                  <li className="ingredients-description" key={index}>
                    {i}
                  </li>
                ))}
              </ul>

              {e.prices.map((v) => (
                <div className="container-price-description" key={v.id}>
                  <div className="container-description-size">
                    <h3 className="size-description">{v.size}:</h3>
                  </div>
                  <div className="container-description-price">
                    <h4 className="price-description">
                      ${v.price.toLocaleString('de-DE')}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default Product
