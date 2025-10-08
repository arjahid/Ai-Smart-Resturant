import React, { useMemo, useState } from 'react';
import NavBar from '../../components/NavBar';
import useOrder from '../../Hooks/useOrder';
import { NavLink } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/AxiousPublic';
import Swal from 'sweetalert2';

const ChefDashboard = () => {
	const { orders = [], refetch } = useOrder() || { orders: [], refetch: null };
	const axiosPublic = useAxiosPublic();
	const [updatingId, setUpdatingId] = useState(null);

	// safe counts
	const { total, pending, preparing, completed } = useMemo(() => {
		const totals = { total: 0, pending: 0, preparing: 0, completed: 0 };
		(orders || []).forEach((o) => {
			totals.total += 1;
			const s = (o.status || '').toLowerCase();
			if (s === 'pending') totals.pending += 1;
			else if (s === 'in_progress' || s === 'preparing') totals.preparing += 1;
			else if (s === 'completed') totals.completed += 1;
		});
		return totals;
	}, [orders]);

	// show latest 6 orders
	const recent = (orders || []).slice(0, 6);

	// allowed statuses for kitchen flow (include server-side 'in_progress')
	const statusOptions = ['pending', 'in_progress', 'preparing', 'cooking', 'ready', 'completed', 'cancelled'];

	// helper to render nicer labels
	const labelFor = (s) => {
		if (!s) return '';
		return s
			.toString()
			.split('_')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');
	};

	const handleUpdateStatus = async (orderId, newStatus) => {
		if (!orderId || !newStatus) return;
		const confirm = await Swal.fire({
			title: 'Update status?',
			text: `Change order status to "${labelFor(newStatus)}"?`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Yes, update',
		});
		if (!confirm.isConfirmed) return;

		try {
			setUpdatingId(orderId);
			await axiosPublic.patch(`/orders/${orderId}`, { status: newStatus });
			if (typeof refetch === 'function') await refetch();
			await Swal.fire('Updated', 'Order status updated.', 'success');
		} catch (err) {
			console.error('Status update failed', err);
			await Swal.fire('Error', err?.response?.data?.message || 'Failed to update status', 'error');
		} finally {
			setUpdatingId(null);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<NavBar />
			<div className="max-w-6xl mx-auto px-4 py-8">
				<header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Chef Dashboard</h1>
						<p className="text-sm text-gray-500 mt-1">Manage incoming orders and track kitchen progress</p>
					</div>
					<div className="flex items-center gap-3">
						<NavLink to="/orders" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded shadow-sm hover:shadow-md text-sm">
							View All Orders
						</NavLink>
					</div>
				</header>

				{/* Stats */}
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					<div className="bg-white rounded-lg shadow p-4">
						<div className="text-sm text-gray-500">Total Orders</div>
						<div className="mt-2 flex items-center justify-between">
							<div>
								<div className="text-2xl font-bold text-gray-900">{total}</div>
								<div className="text-xs text-gray-400">Since last reset</div>
							</div>
							<div className="text-3xl">🧾</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-4">
						<div className="text-sm text-gray-500">Pending</div>
						<div className="mt-2 flex items-center justify-between">
							<div>
								<div className="text-2xl font-bold text-gray-900">{pending}</div>
								<div className="text-xs text-gray-400">New orders to accept</div>
							</div>
							<div className="text-3xl">⏳</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-4">
						<div className="text-sm text-gray-500">Preparing</div>
						<div className="mt-2 flex items-center justify-between">
							<div>
								<div className="text-2xl font-bold text-gray-900">{preparing}</div>
								<div className="text-xs text-gray-400">In the kitchen</div>
							</div>
							<div className="text-3xl">👩‍🍳</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-4">
						<div className="text-sm text-gray-500">Completed</div>
						<div className="mt-2 flex items-center justify-between">
							<div>
								<div className="text-2xl font-bold text-gray-900">{completed}</div>
								<div className="text-xs text-gray-400">Served / Delivered</div>
							</div>
							<div className="text-3xl">✅</div>
						</div>
					</div>
				</section>

				{/* Recent orders */}
				<section className="bg-white rounded-lg shadow p-4">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
						<span className="text-sm text-gray-500">{recent.length} shown</span>
					</div>

					{recent.length === 0 ? (
						<div className="py-8 text-center text-gray-500">No recent orders</div>
					) : (
						<ul className="space-y-3">
							{recent.map((order) => {
								const id = order._id || order.id || '—';
								const status = order.status || 'unknown';
								const itemsCount = Array.isArray(order.items) ? order.items.length : (order.items?.length ?? '—');
								const totalPrice =
									order.total ??
									(Array.isArray(order.items) ? order.items.reduce((s, it) => s + (it.price || it.cost || 0) * (it.qty || 1), 0) : '—');

								// show first item preview (image + name) if available
								const firstItem = Array.isArray(order.items) && order.items.length > 0 ? order.items[0] : null;

								return (
									<li key={id} className="flex items-center justify-between p-3 border rounded">
										<div className="flex items-center gap-4 min-w-0">
											{/* item thumbnail + order info */}
											<div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center mr-0">
												{firstItem?.image ? (
													<img src={firstItem.image} alt={firstItem.name || 'item'} className="w-full h-full object-cover" />
												) : (
													<span className="text-xl">🍽️</span>
												)}
											</div>
											<div className="min-w-0">
												<div className="text-sm font-medium text-gray-900 truncate">Order #{String(id).slice(0, 8)}</div>
												{/* show first item name if available, otherwise summary */}
												<div className="text-xs text-gray-500 truncate">
													{firstItem?.name ? `${firstItem.name} • ${itemsCount} item(s)` : `${itemsCount} item(s)`} • {typeof totalPrice === 'number' ? `৳${totalPrice.toFixed(2)}` : totalPrice}
												</div>
											</div>
										</div>

										<div className="flex items-center gap-3">
											{/* status select */}
											<select
												value={status}
												onChange={(e) => handleUpdateStatus(id, e.target.value)}
												disabled={updatingId === id}
												className="text-sm p-1 border rounded bg-white"
												aria-label={`Change status for order ${id}`}
											>
												{statusOptions.map((s) => (
													<option key={s} value={s}>
														{labelFor(s)}
													</option>
												))}
											</select>

											{/* inline spinner while updating */}
											{updatingId === id && (
												<svg className="w-4 h-4 ml-2 text-gray-500 animate-spin" viewBox="0 0 24 24" fill="none" role="status" aria-hidden="true">
													<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"></circle>
													<path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>
												</svg>
											)}

											<NavLink to={`/orders/${id}`} className="text-sm text-blue-600 hover:underline">
												Details
											</NavLink>
										</div>
									</li>
								);
							})}
						</ul>
					)}
				</section>
			</div>
		</div>
	);
};

export default ChefDashboard;