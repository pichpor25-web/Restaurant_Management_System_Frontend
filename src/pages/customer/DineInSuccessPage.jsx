import { Link, useLocation, useParams } from 'react-router-dom'
import TableAssignedCard from '../../features/dinein/TableAssignedCard.jsx'

const DineInSuccessPage = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const table = state?.table
  const tableNumber = table?.table_number ?? table?.number ?? table?.id

  return (
    <div className="mx-auto max-w-md space-y-5 p-6 text-center">
      <h1 className="text-2xl font-black">Payment received 🎉</h1>
      <TableAssignedCard tableNumber={tableNumber} />
      <Link className="text-sm font-semibold text-rose-600" to={`/track/${id}`}>Track my order</Link>
    </div>
  )
}

export default DineInSuccessPage
