import { matchPath, useLocation } from 'react-router-dom';

export default function useMatchPath(patterns) {
  const {pathname} = useLocation()

  return patterns.find(pattern => matchPath(pattern, pathname))
}
