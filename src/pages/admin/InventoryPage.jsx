import PageHeader from '../../components/common/PageHeader.jsx'
import StockTable from '../../features/admin/StockTable.jsx'
import Loader from '../../components/ui/Loader.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { inventoryService } from '../../services/inventoryService.js'

const InventoryPage = () => {
  const { data, loading, error } = useFetch(() => inventoryService.list())
  return (
    <>
      <PageHeader title="Inventory / Stock" subtitle="Track ingredient stock levels" />
      <ErrorMessage message={error} />
      {loading ? <Loader /> : <StockTable items={Array.isArray(data) ? data : []} />}
    </>
  )
}

export default InventoryPage
