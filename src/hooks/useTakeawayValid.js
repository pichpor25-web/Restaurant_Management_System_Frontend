import { useCart } from './useCart.js'
import { isValidName, isValidPhone } from '../utils/validators.js'

export const useTakeawayValid = () => {
  const { customer } = useCart()
  return isValidName(customer.name) && isValidPhone(customer.phone)
}
