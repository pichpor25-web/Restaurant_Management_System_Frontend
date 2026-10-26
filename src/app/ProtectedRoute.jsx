import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

const ProtectedRoute = () => {
  const { user, token } = useAuth();
  const location = useLocation();

  
  if (!user && !localStorage.getItem('rms_token')) {
    
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;