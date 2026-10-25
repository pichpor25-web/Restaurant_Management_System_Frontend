const TableAssignedCard = ({ tableNumber }) => (
  <div className="rounded-3xl bg-rose-600 p-8 text-center text-white">
    <p className="text-sm font-semibold opacity-80">Your table</p>
    <p className="my-2 text-6xl font-black">#{tableNumber ?? '—'}</p>
    <p className="text-sm opacity-90">Please go and sit at this table while your order is prepared.</p>
  </div>
)

export default TableAssignedCard
