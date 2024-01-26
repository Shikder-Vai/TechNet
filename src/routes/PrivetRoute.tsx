import { useAppSelector } from '@/redux/Hooks';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function PriveteRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);

  const { pathname } = useLocation();
  if (isLoading) {
    <p>Loading......</p>;
  }
  if (!user.email && !isLoading) {
    return <Navigate to={'/login'} state={{ pathname }} />;
  }

  return children;
}
