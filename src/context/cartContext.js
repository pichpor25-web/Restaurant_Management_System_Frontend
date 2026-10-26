// src/context/cartContext.js
import { createContext, useContext } from 'react';

// បង្កើត Context (ដាក់ Default Value ទទេ ដើម្បីកុំឱ្យ Error ពេលគ្មានទិន្នន័យ)
export const CartContext = createContext({
  items: [],
  setItems: () => {},
});

// បង្កើត Hook សម្រាប់ហៅប្រើ
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};