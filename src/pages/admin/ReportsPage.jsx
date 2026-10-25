import PageHeader from '../../components/common/PageHeader.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'

// TODO: daily / monthly sales reports, best sellers, export CSV
const ReportsPage = () => (
  <>
    <PageHeader title="Reports" />
    <EmptyState title="Reports coming soon" hint="Add date-range filters and export here." />
  </>
)

export default ReportsPage
