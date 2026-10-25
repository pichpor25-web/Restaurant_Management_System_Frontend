import PageHeader from '../../components/common/PageHeader.jsx'
import TableGrid from '../../features/admin/TableGrid.jsx'
import Loader from '../../components/ui/Loader.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import { useTables } from '../../hooks/useTables.js'

const TablesPage = () => {
  const { data, loading, error } = useTables()
  return (
    <>
      <PageHeader title="Tables" subtitle="Available / occupied / reserved" />
      <ErrorMessage message={error} />
      {loading ? <Loader /> : <TableGrid tables={Array.isArray(data) ? data : []} />}
    </>
  )
}

export default TablesPage
