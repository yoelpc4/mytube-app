import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectUser } from '@/store/auth.js';

export default function Auth() {
  const location = useLocation()

  const user = useSelector(selectUser)

  return !user ? <Navigate to="/login" state={{ from: location }} replace /> : <Outlet/>
}
