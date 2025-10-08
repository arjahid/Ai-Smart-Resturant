
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './AxiousPublic';


const useOrder = () => {
   const axiosPublic = useAxiosPublic();

	const { refetch, data: orders = [], isLoading, error } = useQuery({
		queryKey: ['orders'],
		queryFn: async () => {
			const res = await axiosPublic.get('/orders');
			return res.data;
		},
		
	});

	return { orders, refetch, isLoading, error };
};

export default useOrder;