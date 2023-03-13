import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function Auth() {
  const user = useSelector(state => state.auth.user)

  const location = useLocation()

  return !user ? <Navigate to="/login" state={{ from: location }} /> : <Outlet/>
}
