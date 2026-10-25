import { useCallback, useMemo, useState } from "react";
import CategoryTabs from "../../features/menu/CategoryTabs.jsx";
import MenuGrid from "../../features/menu/MenuGrid.jsx";
import OrderPanel from "../../features/cart/OrderPanel.jsx";
import CartButton from "../../features/cart/CartButton.jsx";
import CartDrawer from "../../features/cart/CartDrawer.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import Loader from "../../components/ui/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import { useCategories, useMenuItems } from "../../hooks/useMenu.js";

const MenuPage = () => {
  const [categoryId, setCategoryId] = useState(null);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const categories = useCategories();
  const menu = useMenuItems({ per_page: 100, available: 1 });

  const items = useMemo(() => {
    const list = Array.isArray(menu.data) ? menu.data : [];
    return list.filter(
      (i) =>
        (categoryId === null || i.category_id === categoryId) &&
        i.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [menu.data, categoryId, search]);

  return (
    <>
      {/* pb-28 keeps the last cards clear of the floating basket button */}
      <div className="mx-auto max-w-7xl space-y-5 p-5 pb-28">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryTabs
          categories={Array.isArray(categories.data) ? categories.data : []}
          activeId={categoryId}
          onChange={setCategoryId}
        />
        <ErrorMessage message={menu.error} />
        {menu.loading ? <Loader /> : <MenuGrid items={items} />}
      </div>

      <CartButton onClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={closeCart}>
        <OrderPanel onClose={closeCart} />
      </CartDrawer>
    </>
  );
};

export default MenuPage;
