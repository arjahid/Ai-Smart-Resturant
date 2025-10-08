import React from 'react';
import useOrder from '../Hooks/useOrder';
import NavBar from './NavBar';

const statusBadgeClass = (status) => {
	switch ((status || '').toLowerCase()) {
		case 'pending': return 'bg-yellow-100 text-yellow-800';
		case 'in_progress':
		case 'preparing':
		case 'cooking': return 'bg-blue-100 text-blue-800';
		case 'ready': return 'bg-indigo-100 text-indigo-800';
		case 'completed': return 'bg-green-100 text-green-800';
		case 'cancelled': return 'bg-red-100 text-red-800';
		default: return 'bg-gray-100 text-gray-800';
	}
};

const formatCurrency = (v) => `৳${Number(v || 0).toFixed(2)}`;

const OrderCard = () => {
	const { orders = [] } = useOrder() || { orders: [] };

	return (
		<div className="py-6">
            <NavBar></NavBar>
			<h2 className="text-3xl font-bold text-center my-6">
				Your Orders <span className="text-base font-normal text-gray-500">({orders.length})</span>
			</h2>

			<div className="max-w-7xl mx-auto px-4">
				{orders.length === 0 ? (
					<div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">No orders yet.</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{orders.map((order) => {
							const id = order._id || order.id || '';
							const items = Array.isArray(order.items) ? order.items : order.items ? [order.items] : [];
							const first = items[0] || null;
							const itemsCount = items.length;
							const total = order.total ?? items.reduce((s, it) => s + (Number(it.price || it.cost || 0) * (it.qty || 1)), 0);
							const date = order.createdAt ? new Date(order.createdAt).toLocaleString() : (order.date || '');
							const status = order.status || 'unknown';

							return (
								<article key={id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
									{/* Thumbnail */}
									<div className="h-36 bg-gray-100 flex items-center justify-center overflow-hidden">
										{first?.image ? (
											<img src={first.image} alt={first.name || 'item'} className="w-full h-full object-cover" />
										) : (
											<div className="text-4xl">🍽️</div>
										)}
									</div>

									{/* Content */}
									<div className="p-4 flex-1 flex flex-col">
										<div className="flex items-start justify-between gap-3">
											<div className="min-w-0">
												<div className="text-sm font-semibold text-gray-900 truncate">Order #{String(id).slice(0, 8)}</div>
												<div className="text-xs text-gray-500 mt-1 truncate">
													{first?.name ? <span className="font-bold text-sm">{first.name}</span> : 'No item title'} • {itemsCount} item(s)
												</div>
											</div>

											<span className={`px-2 py-1 rounded text-xs font-medium ${statusBadgeClass(status)}`}>
												{status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
											</span>
										</div>

										<div className="mt-3 flex items-center justify-between text-sm text-gray-600">
											<div>
												<div className="text-xs">Placed</div>
												<div className="text-sm text-gray-800">{date || '—'}</div>
											</div>
											<div className="text-right">
												<div className="text-xs">Total</div>
												<div className="text-lg font-bold text-orange-600">{formatCurrency(total)}</div>
											</div>
										</div>
									</div>
								</article>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderCard;