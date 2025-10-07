import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './AxiousPublic';

const useCart = () => {
	const axiosPublic = useAxiosPublic();

	const { refetch, data: cart = [], isLoading, error } = useQuery({
		queryKey: ['cart'],
		queryFn: async () => {
			const res = await axiosPublic.get('/menucart');
			return res.data;
		},
		
	});

	return { cart, refetch, isLoading, error };
};

export default useCart;