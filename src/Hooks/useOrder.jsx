
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './AxiousPublic';
import { useContext } from 'react';
import { AuthContext } from '../components/provider/AuthProvider';


const useOrder = () => {
   const axiosPublic = useAxiosPublic();
   const {user}=useContext(AuthContext);

	const { refetch, data: orders = [], isLoading, error } = useQuery({
		queryKey: ['orders', user?.email],
		queryFn: async () => {
			const res = await axiosPublic.get(`/orders?email=${user?.email}`);
			return res.data;
		},
		
	});

	return { orders, refetch, isLoading, error };
};

export default useOrder;