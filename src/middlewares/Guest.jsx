import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function Guest() {
  const user = useSelector(state => state.auth.user)

  const location = useLocation()

  return user ? <Navigate to="/" state={{ from: location }} /> : <Outlet />
}
