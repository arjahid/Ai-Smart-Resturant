import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './AxiousPublic';
import { AuthContext } from '../components/provider/AuthProvider';

const useAllOrders = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const role = user?.role;

  const { refetch, data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders', role],
    queryFn: async () => {
      if (role === 'admin' || role === 'chef') {
        const res = await axiosPublic.get('/allOrders');
        return res.data;
      } else {
        
        return [];
      }
    },
    enabled: role === 'admin' || role === 'chef', 
  });

  return { orders, refetch, isLoading, error };
};

export default useAllOrders;
