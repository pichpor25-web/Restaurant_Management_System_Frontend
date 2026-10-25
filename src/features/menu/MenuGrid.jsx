import MenuCard from './MenuCard.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'

const MenuGrid = ({ items = [] }) =>
  items.length === 0 ? (
    <EmptyState title="No menu items found" />
  ) : (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => <MenuCard key={item.id} item={item} />)}
    </div>
  )

export default MenuGrid
