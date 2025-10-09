import React, { useMemo, useCallback } from 'react';
import useOrder from '../../Hooks/useOrder';
import useAxiosPublic from '../../Hooks/AxiousPublic';
import Swal from 'sweetalert2';

const statusClass = (s) => {
	if (!s) return 'bg-gray-100 text-gray-800';
	switch (s.toLowerCase()) {
		case 'pending': return 'bg-yellow-100 text-yellow-800';
		case 'preparing':
		case 'in_progress': return 'bg-blue-100 text-blue-800';
		case 'completed': return 'bg-green-100 text-green-800';
		case 'cancelled': return 'bg-red-100 text-red-800';
		default: return 'bg-gray-100 text-gray-800';
	}
};

const formatCurrency = (v) => `৳${Number(v || 0).toFixed(2)}`;

const UserDashboard = () => {
	const { orders = [], refetch, isLoading, error } = useOrder();
	const axiosPublic = useAxiosPublic();

	const counts = useMemo(() => {
		const total = orders.length;
		const pending = orders.filter(o => (o.status || '').toLowerCase() === 'pending').length;
		const preparing = orders.filter(o => ['in_progress','preparing'].includes((o.status || '').toLowerCase())).length;
		const completed = orders.filter(o => (o.status || '').toLowerCase() === 'completed').length;
		return { total, pending, preparing, completed };
	}, [orders]);

	const handleCancel = useCallback(async (orderId) => {
		const res = await Swal.fire({
			title: 'Cancel order?',
			text: 'This will cancel your order. Continue?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, cancel',
		});
		if (!res.isConfirmed) return;
		try {
			await axiosPublic.delete(`/orders/${orderId}`);
			await refetch();
			Swal.fire('Cancelled', 'Your order has been cancelled.', 'success');
		} catch (err) {
			console.error(err);
			Swal.fire('Error', err?.response?.data?.message || 'Failed to cancel order', 'error');
		}
	}, [axiosPublic, refetch]);

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-5xl mx-auto px-4">
				<header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
						<p className="text-sm text-gray-500 mt-1">Overview of your orders</p>
					</div>
					<div className="flex items-center gap-3">
						<button onClick={() => refetch()} className="px-3 py-2 bg-white border rounded text-sm hover:bg-gray-50">
							{isLoading ? 'Refreshing...' : 'Refresh'}
						</button>
					</div>
				</header>

				{/* Stats */}
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
					<div className="bg-white rounded-lg shadow p-4">
						<div className="text-sm text-gray-500">Total Orders</div>
						<div className="mt-2 text-2xl font-bold text-gray-900">{counts.total}</div>
					</div>
					<div className="bg-white rounded-lg shadow p-4">
						<div className="text-sm text-gray-500">Pending</div>
						<div className="mt-2 text-2xl font-bold text-gray-900">{counts.pending}</div>
					</div>
					<div className="bg-white rounded-lg shadow p-4">
						<div className="text-sm text-gray-500">Preparing</div>
						<div className="mt-2 text-2xl font-bold text-gray-900">{counts.preparing}</div>
					</div>
					<div className="bg-white rounded-lg shadow p-4">
						<div className="text-sm text-gray-500">Completed</div>
						<div className="mt-2 text-2xl font-bold text-gray-900">{counts.completed}</div>
					</div>
				</section>

				{/* Orders list */}
				<section className="bg-white rounded-lg shadow p-4">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">Your Orders</h2>

					{isLoading && <div className="text-center py-8">Loading orders...</div>}
					{error && <div className="text-red-600 py-2">{String(error?.message || error)}</div>}

					{!isLoading && orders.length === 0 && <div className="text-gray-600 py-8">You have no orders yet.</div>}

					<ul className="space-y-3">
						{orders.map(order => {
							const id = order._id || order.id;
							const status = (order.status || 'unknown').toLowerCase();
							const items = Array.isArray(order.items) ? order.items : (order.items ? [order.items] : []);
							const first = items[0] || null;
							const total = order.total ?? items.reduce((s, it) => s + (Number(it.price || it.cost || 0) * (it.qty || 1)), 0);
							const date = order.createdAt ? new Date(order.createdAt).toLocaleString() : (order.date || '');

							return (
								<li key={id} className="flex items-center justify-between p-3 border rounded">
									<div className="flex items-center gap-4 min-w-0">
										<div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
											{first?.image ? <img src={first.image} alt={first.name} className="w-full h-full object-cover" /> : <span className="text-xl">🍽️</span>}
										</div>
										<div className="min-w-0">
											<div className="text-sm font-medium text-gray-900 truncate">Order #{String(id).slice(0,8)}</div>
											<div className="text-xs text-gray-500 truncate">{first?.name ? `${first.name} • ${items.length} item(s)` : `${items.length} item(s)`}</div>
											<div className="text-xs text-gray-400 mt-1">{date}</div>
										</div>
									</div>

									<div className="flex items-center gap-4">
										<span className={`px-2 py-1 rounded text-xs font-medium ${statusClass(status)}`}>{status.replace(/_/g,' ')}</span>
										<div className="text-right">
											<div className="text-sm font-bold text-orange-600">{formatCurrency(total)}</div>
											{status === 'pending' && (
												<button onClick={() => handleCancel(id)} className="mt-2 text-sm text-red-600 hover:underline">Cancel</button>
											)}
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</section>
			</div>
		</div>
	);
};

export default UserDashboard;