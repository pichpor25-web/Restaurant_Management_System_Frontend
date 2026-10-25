import { useFetch } from './useFetch.js'
import { orderService } from '../services/orderService.js'

export const useOrders = (params) =>
  useFetch(() => orderService.list(params), JSON.stringify(params))
