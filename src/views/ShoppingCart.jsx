import React from 'react'
import { useState } from 'react'
import Edit from '../components/Edit'
import { ProductsContext } from '../context/ProductsProvider'
import infoCard from '../data/coordinates.js'
const ShoppingCart = () => {
  const [viewPay, setViewPay] = useState(1)
  const [numberCard, setNumberCard] = useState('')
  const [passwCard, setPasswCard] = useState('')
  const [cor1, setCor1] = useState('')
  const [cor2, setCor2] = useState('')
  const [cor3, setCor3] = useState('')
  const [c1, setC1] = useState('')
  const [c2, setC2] = useState('')
  const [c3, setC3] = useState('')
  const [edit, setEdit] = useState('')
  const [viewEdit, setViewEdit] = useState(false)
  const [cardData] = useState(infoCard)
  const [numReg, setNumReg] = useState('')
  const { cartProducts, setcartProducts } = React.useContext(ProductsContext)
  const editProduct = (product) => {
    setEdit(product)
    setViewEdit(true)
  }
  const payment = (state) => {
    if (state === 7) {
      setViewPay(1)
      setcartProducts([])
      setCor1('')
      setCor2('')
      setCor3('')
      setC1('')
      setC2('')
      setC3('')
      setNumberCard('')
      setPasswCard('')
    } else {
      setViewPay(state)
    }
    if (state === 6) {
    }

    if (state === 3) {
      setNumReg(
        cardData.filter(
          (e) => e.numcart === numberCard && e.password === passwCard
        )
      )
    }

    if (viewPay === 3 && numReg.length > 0) {
      for (var i = 0; i < 3; ) {
        const cordinatesInfo = numReg[0].coordinates
        const rand = Math.floor(Math.random() * cordinatesInfo.length)
        const rValue = cordinatesInfo[rand]
        if (i === 0) {
          setC1(rValue)
        } else if (i === 1) {
          setC2(rValue)
        } else if (i === 2) {
          setC3(rValue)
        }

        i++
      }
    }
  }

  return (
    <div>
      {viewEdit ? (
        <div className="container-cart">
          <Edit edit={edit} setEdit={setEdit} setViewEdit={setViewEdit} />
        </div>
      ) : (
        <div className="container-cart">
          <div className="container-cart-items">
            {cartProducts.length > 0 ? (
              <div className="container-description">
                <div className="text-cart0 cart-title">
                  <h1 className="text-cart  cart-title">id</h1>
                </div>
                <div className="text-cart1  cart-title">
                  <h1 className="text-cart">Pizza</h1>
                </div>
                <div className="text-cart2  cart-title">
                  <h1 className="text-cart">Tamaño</h1>
                </div>
                <div className="text-cart3  cart-title">
                  <h1 className="text-cart">Masa</h1>
                </div>
                <div className="text-cart4  cart-title">
                  <h1 className="text-cart">Salsa</h1>
                </div>
                <div className="text-cart5  cart-title">
                  <h1 className="text-cart">Un</h1>
                </div>
                <div className="text-cart6_title  cart-title">
                  <h1 className="text-cart">Precio</h1>
                </div>
                <div className="text-cart7_title  cart-title">
                  <h1 className="text-cart">Total</h1>
                </div>
                <div className="text-cart8_title  cart-title">
                  <h1 className="text-cart">Ed</h1>
                </div>
              </div>
            ) : (
              <h4 className="ms-empy-cart">Tu carro se encuentra vacío</h4>
            )}

            {cartProducts.length === 0
              ? ''
              : cartProducts.map((e, index) => (
                  <div className="container-description" key={e.id}>
                    <div className="text-cart0">
                      <h4 className="text-cart">{index + 1}</h4>
                    </div>
                    <div className="text-cart1">
                      <h4 className="text-cart">{e.name}</h4>
                    </div>
                    <div className="text-cart2">
                      <h4 className="text-cart">{e.size}</h4>
                    </div>
                    <div className="text-cart3">
                      <h4 className="text-cart">{e.thicknessAdd}</h4>
                    </div>
                    <div className="text-cart4">
                      <h4 className="text-cart">{e.sauce}</h4>
                    </div>
                    <div className="text-cart5">
                      <h4 className="text-cart">{e.amount}</h4>
                    </div>
                    <div className="text-cart6">
                      <h4 className="text-cart">
                        {' '}
                        ${e.price.toLocaleString('de-DE')}
                      </h4>
                    </div>
                    <div className="text-cart7">
                      <h4 className="text-cart">
                        {' '}
                        ${(e.price * e.amount).toLocaleString('de-DE')}
                      </h4>
                    </div>
                    <div className="text-cart8" onClick={() => editProduct(e)}>
                      ✏
                    </div>
                    {console.log(edit)}
                  </div>
                ))}

            {cartProducts.length === 0 ? (
              ''
            ) : (
              <div className="text-total">
                <h3 className="total-general">
                  Total $
                  {cartProducts
                    .map((item) => item.price * item.amount)
                    .reduce((prev, curr) => prev + curr, 0)
                    .toLocaleString('de-DE')}
                </h3>
              </div>
            )}
          </div>

          {cartProducts.length > 0 && viewPay === 1 ? (
            <div className="container-btn-pay">
              <button className="btn-payment" onClick={() => payment(2)}>
                Pagar
              </button>
            </div>
          ) : (
            ''
          )}
          {cartProducts.length > 0 && viewPay === 2 ? (
            <div className="container-data-cart">
              <h4 className="title-pay">Ingresa tus clave de Internet</h4>
              <div className="container-cart-info">
                <h4 className="cart-text-info">Número de tarjeta:</h4>
                <input
                  className="input-cart-num"
                  autoComplete="off"
                  placeholder="Ingresa tu número de tarjeta"
                  type="number"
                  value={numberCard}
                  onChange={(e) => {
                    setNumberCard(e.target.value)
                  }}
                />
              </div>
              <div className="container-cart-info password">
                <h4 className="cart-text-info">Clave:</h4>
                <input
                  className="input-cart-num"
                  autoComplete="off"
                  placeholder="Ingresa tu  clave"
                  type="text"
                  value={passwCard}
                  onChange={(e) => {
                    setPasswCard(e.target.value)
                  }}
                />
              </div>
              <div className="container-btn-payment-accept">
                <button
                  className="btn-payment-accept"
                  onClick={() => payment(3)}
                >
                  Aceptar
                </button>
              </div>
              <div className="container-btn-payment">
                <button
                  className="btn-payment-cancel"
                  onClick={() => payment(1)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
          {numReg.length === 0 && viewPay === 3 ? (
            <div className="container-error-pasword">
              <h4 className="error-pasword">
                Tu clave y/o contraseña son incorrectas.
              </h4>
              <div className="container-btn-payment-accept">
                <button
                  className="btn-payment-accept"
                  onClick={() => payment(2)}
                >
                  Aceptar
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
          {viewPay === 3 && numReg.length === 1 ? (
            <div className="container-btn-payment-accept">
              <button className="btn-payment-accept" onClick={() => payment(4)}>
                Ingresar clave 2.0
              </button>
            </div>
          ) : (
            ''
          )}
          {viewPay === 4 && numReg.length > 0 ? (
            <div className="container-cordinates">
              <div className="container-cordinates-b">
                <div className="container-cordinates-c">
                  <div className="container-info-cordinates">
                    <div className="container-input-cord">
                      <h4 className="title-cord">{c1.id}</h4>
                      <input
                        className="input-coronates"
                        autoComplete="off"
                        type="text"
                        maxLength="2"
                        value={cor1}
                        onChange={(e) => {
                          setCor1(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div className="container-info-cordinates">
                    <div className="container-input-cord">
                      <h4 className="title-cord">{c2.id}</h4>
                      <input
                        className="input-coronates"
                        autoComplete="off"
                        type="text"
                        maxLength="2"
                        value={cor2}
                        onChange={(e) => {
                          setCor2(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div className="container-info-cordinates">
                    <div className="container-input-cord">
                      <h4 className="title-cord">{c3.id}</h4>
                      <input
                        className="input-coronates"
                        autoComplete="off"
                        maxLength="2"
                        type="text"
                        value={cor3}
                        onChange={(e) => {
                          setCor3(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="container-btn-payment-accept">
                  <button
                    className="btn-payment-accept"
                    onClick={() => payment(6)}
                  >
                    Aceptar
                  </button>
                </div>
                <div className="container-btn-payment">
                  <button
                    className="btn-payment-cancel"
                    onClick={() => payment(1)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {viewPay === 6 &&
          (c1.n !== cor1 || c2.n !== cor2 || c2.n !== cor2) ? (
            <div className="container-end">
              {console.log('esto es C1', c1)}
              {console.log('esto setcor1', cor1)}
              <div className="container-btn-payment-accept">
                <h4 className="text-end">Tu compra no se pudo realizar</h4>
              </div>
              <div className="container-btn-payment">
                <button
                  className="btn-payment-cancel"
                  onClick={() => payment(1)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
          {viewPay === 6 && c1.n === cor1 && c2.n === cor2 && c3.n === cor3 ? (
            <div className="container-end">
              {console.log('esto es C1', c1)}
              {console.log('esto setcor1', cor1)}
              <div className="container-btn-payment-accept">
                <h4 className="text-end">Su compra fue exitosa</h4>
              </div>
              <div className="container-btn-payment">
                <button
                  className="btn-payment-accept"
                  onClick={() => payment(7)}
                >
                  Terminar
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}

export default ShoppingCart
