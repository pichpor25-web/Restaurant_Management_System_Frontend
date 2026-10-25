import { useContext } from 'react'
import { CartContext } from '../context/cartContext.js'
export const useCart = () => useContext(CartContext)
