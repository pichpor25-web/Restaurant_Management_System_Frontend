// src/app/providers.jsx
import { ThemeProvider } from '../context/ThemeContext.jsx'
import CartProvider from '../context/CartProvider.jsx'
import AuthProvider from '../context/AuthProvider.jsx' // នាំចូល AuthProvider

const Providers = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>      {/* ដាក់ AuthProvider នៅទីនេះ */}
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default Providers