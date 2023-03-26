import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function Guest() {
  const location = useLocation()

  const user = useSelector(state => state.auth.user)

  return user ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />
}
