import { useFetch } from './useFetch.js'
import { categoryService } from '../services/categoryService.js'
import { menuItemService } from '../services/menuItemService.js'

export const useCategories = () => useFetch(() => categoryService.list())
export const useMenuItems = (params) =>
  useFetch(() => menuItemService.list(params), JSON.stringify(params))
