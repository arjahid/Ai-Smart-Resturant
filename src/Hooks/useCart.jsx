import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './AxiousPublic';
import { AuthContext } from '../components/provider/AuthProvider';

const useCart = () => {
	const axiosPublic = useAxiosPublic();
	const {user}=useContext(AuthContext);

	const { refetch, data: cart = [], isLoading, error } = useQuery({
		queryKey: ['cart', user?.email],
		queryFn: async () => {
			const res = await axiosPublic.get(`/menucart?email=${user?.email}`);
			return res.data;
		},
		
	});

	return { cart, refetch, isLoading, error };
};

export default useCart;