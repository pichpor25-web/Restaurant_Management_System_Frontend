import AuthProvider from '../context/AuthProvider.jsx'
import CartProvider from '../context/CartProvider.jsx'

const Providers = ({ children }) => (
  <AuthProvider>
    <CartProvider>{children}</CartProvider>
  </AuthProvider>
)

export default Providers
