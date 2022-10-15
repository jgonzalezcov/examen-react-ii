import React from 'react'
import { ProductsContext } from '../context/ProductsProvider'
import { useState } from 'react'
const Edit = (props) => {
  const { cartProducts, setcartProducts } = React.useContext(ProductsContext)
  const [editAmount, setEditAmount] = useState(1)
  const [viewEdit, setViewEdit] = useState(false)
  const clean = (i) => {
    console.log(i)
    if (i === 'delete') {
      setcartProducts(cartProducts.filter((el) => el.id !== props.edit.id))
      props.setViewEdit(false)
      return
    }
    if (i === 'cancel') {
      props.setViewEdit(false)
      return
    }
    if (i === 'accept') {
      props.setViewEdit(false)

      setcartProducts((current) =>
        current.map((obj) => {
          if (obj.id === props.edit.id) {
            return { ...obj, amount: editAmount }
          }
          return obj
        })
      )
    }
  }
  const amountFunctions = (i) => {
    if (i === 'view') {
      setEditAmount(props.edit.amount)
      setViewEdit(true)
    }

    if (i === 'add') {
      setEditAmount(editAmount * 1 + 1)
    }
    if (i === 'subtract' && editAmount > 1) {
      setEditAmount(editAmount - 1)
    }
  }

  return (
    <div className="container-edit">
      <div className="edit">
        <h4 className="title-edit">Modifica tu pedido</h4>
        <div className="edit-product">
          <h4 className="text-edit-items">Id: {props.edit.id}</h4>
          <h4 className="text-edit-items">Pizza: {props.edit.name}</h4>
          <h4 className="text-edit-items">Tamaño: {props.edit.size}</h4>
          <h4 className="text-edit-items">Masa: {props.edit.thicknessAdd}</h4>
          <h4 className="text-edit-items">Salsa: {props.edit.sauce}</h4>
          <h4 className="text-edit-items">Unidades: {props.edit.amount}</h4>
          <h4 className="text-edit-items">
            Precio c/u: ${(props.edit.price * 1).toLocaleString('de-DE')}
          </h4>
          <h4 className="text-edit-items">
            Total items: ${' '}
            {(props.edit.amount * props.edit.price).toLocaleString('de-DE')}
          </h4>
        </div>
        {viewEdit ? (
          <div className="section-edit">
            <div className="edit-amount">
              <div className="container-title-edit-aount">
                <h4 className="text-title-edit-mount">Modifica la cantidad</h4>
              </div>
              <div className="container-mod-amount">
                <button
                  className="btn-edit-amount"
                  onClick={() => amountFunctions('subtract')}
                >
                  -
                </button>
                <h4 className="text-edit-amount">{editAmount}</h4>
                <button
                  className="btn-edit-amount"
                  onClick={() => amountFunctions('add')}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="section-edit">
            <div className="container-title-edit-aount">
              <button
                className="btn-payment-accept btn-delete"
                onClick={() => amountFunctions('view')}
              >
                Modificar
              </button>
            </div>
            <div className="container-title-edit-aount">
              <button
                className="btn-payment-accept"
                onClick={() => clean('delete')}
              >
                Eliminar
              </button>
            </div>
          </div>
        )}

        {viewEdit ? (
          <div className="container-btn-payment">
            <button
              className="btn-payment-accept"
              onClick={() => clean('accept')}
            >
              Aceptar
            </button>
          </div>
        ) : (
          ''
        )}
        <div className="container-btn-payment">
          <button
            className="btn-payment-cancel"
            onClick={() => clean('cancel')}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Edit
