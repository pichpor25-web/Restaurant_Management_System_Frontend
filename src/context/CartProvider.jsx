import { useMemo, useReducer } from 'react'
import { CartContext } from './cartContext.js'
import { ORDER_TYPE } from '../utils/constants.js'
import { calcTotals } from '../utils/calcTotals.js'

const initial = {
  items: [], // { id, name, price, image, qty }
  orderType: ORDER_TYPE.DINE_IN,
  customer: { name: '', phone: '' }, // take-away only
  paymentMethod: 'bakong',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const found = state.items.find((i) => i.id === action.item.id)
      const items = found
        ? state.items.map((i) => (i.id === found.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state.items, { ...action.item, qty: 1 }]
      return { ...state, items }
    }
    case 'DECREASE':
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0),
      }
    case 'SET_TYPE':
      return { ...state, orderType: action.orderType }
    case 'SET_CUSTOMER':
      return { ...state, customer: { ...state.customer, ...action.patch } }
    case 'SET_PAYMENT':
      return { ...state, paymentMethod: action.method }
    case 'CLEAR':
      return initial
    default:
      return state
  }
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial)
  const value = useMemo(
    () => ({
      ...state,
      totals: calcTotals(state.items, state.orderType),
      addItem: (item) => dispatch({ type: 'ADD', item }),
      decreaseItem: (id) => dispatch({ type: 'DECREASE', id }),
      setOrderType: (orderType) => dispatch({ type: 'SET_TYPE', orderType }),
      setCustomer: (patch) => dispatch({ type: 'SET_CUSTOMER', patch }),
      setPaymentMethod: (method) => dispatch({ type: 'SET_PAYMENT', method }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [state],
  )
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
