import { useMemo, useState } from 'react'
import CategoryTabs from '../../features/menu/CategoryTabs.jsx'
import MenuGrid from '../../features/menu/MenuGrid.jsx'
import OrderPanel from '../../features/cart/OrderPanel.jsx'
import SearchBar from '../../components/common/SearchBar.jsx'
import Loader from '../../components/ui/Loader.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import { useCategories, useMenuItems } from '../../hooks/useMenu.js'

const MenuPage = () => {
  const [categoryId, setCategoryId] = useState(null)
  const [search, setSearch] = useState('')
  const categories = useCategories()
  const menu = useMenuItems({})

  const items = useMemo(() => {
    const list = Array.isArray(menu.data) ? menu.data : []
    return list.filter(
      (i) =>
        (categoryId === null || i.category_id === categoryId) &&
        i.name?.toLowerCase().includes(search.toLowerCase()),
    )
  }, [menu.data, categoryId, search])

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_380px]">
      <section className="space-y-5 p-5">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryTabs
          categories={Array.isArray(categories.data) ? categories.data : []}
          activeId={categoryId}
          onChange={setCategoryId}
        />
        <ErrorMessage message={menu.error} />
        {menu.loading ? <Loader /> : <MenuGrid items={items} />}
      </section>
      <div className="border-l border-slate-200 lg:sticky lg:top-0 lg:h-screen"><OrderPanel /></div>
    </div>
  )
}

export default MenuPage
