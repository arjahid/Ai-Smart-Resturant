import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../components/provider/AuthProvider';
import useRole from '../Hooks/useRole';

const ChefRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, loading: roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-orange-600 loading-lg"></span>
      </div>
    );
  }

  
  if (!user || (role !== 'chef' && role !== 'admin')) {
    return <Navigate to='/login' state={{from: location,message:'You are not authorized to access this page'}} replace />
  }

  return children;
};

export default ChefRouter;
