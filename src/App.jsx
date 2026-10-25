import { RouterProvider } from 'react-router-dom'
import Providers from './app/providers.jsx'
import { router } from './app/router.jsx'

const App = () => (
  <Providers>
    <RouterProvider router={router} />
  </Providers>
)

export default App
