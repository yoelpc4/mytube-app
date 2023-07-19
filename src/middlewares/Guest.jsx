import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectUser } from '@/store/auth.js';

export default function Guest() {
  const location = useLocation()

  const user = useSelector(selectUser)

  return user ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />
}
