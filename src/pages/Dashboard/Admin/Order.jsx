import React from 'react';

const Order = () => {
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

export default Order;