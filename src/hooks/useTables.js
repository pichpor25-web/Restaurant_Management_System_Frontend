import { useFetch } from './useFetch.js'
import { tableService } from '../services/tableService.js'

export const useTables = () => useFetch(() => tableService.list())
