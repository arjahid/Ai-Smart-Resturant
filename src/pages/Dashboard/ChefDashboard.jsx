import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import NavBar from '../../components/NavBar';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../components/provider/AuthProvider';
import useAxiosPublic from '../../Hooks/AxiousPublic';
import Swal from 'sweetalert2';

const labelFor = (s) => (s || '').toString().split('_').map(w => w[0]?.toUpperCase()+w.slice(1)).join(' ');
const formatCurrency = v => `৳${Number(v || 0).toFixed(2)}`;

const ChefDashboard = () => {
	const { user } = useContext(AuthContext);
	const axiosPublic = useAxiosPublic();

	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [updatingId, setUpdatingId] = useState(null);
	const [removingId, setRemovingId] = useState(null);

	const mountedRef = useRef(true);

	const fetchOrders = async () => {
		if (!axiosPublic || !user?.email) return;
		setLoading(true);
		setError(null);
		try {
			const res = await axiosPublic.get(`/orders/chef/${encodeURIComponent(user.email)}`);
			const data = res?.data;
			setOrders(Array.isArray(data) ? data : (data?.orders ?? []));
		} catch (err) {
			// console.error('Failed to fetch chef orders', err);
			setError(err?.response?.data?.message || err.message || 'Failed to load orders');
		} finally {
			if (mountedRef.current) setLoading(false);
		}
	};

	useEffect(() => {
		mountedRef.current = true;
		// initial load (run once when user email becomes available)
		fetchOrders();
		return () => {
			mountedRef.current = false;
		};
	}, [user?.email]);

	// detect transitions to 'completed'
	const prevStatusRef = useRef(new Map());
	useEffect(() => {
		const prev = prevStatusRef.current;
		orders.forEach(o => {
			const id = o._id || o.id;
			if (!id) return;
			const prevStatus = prev.get(id);
			const currStatus = (o.status || '').toLowerCase();
			if (prevStatus && prevStatus !== 'completed' && currStatus === 'completed') {
				Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `Order #${String(id).slice(0,8)} completed`, timer: 3000, showConfirmButton: false });
			}
			prev.set(id, currStatus);
		});
		// cleanup removed orders
		for (const k of Array.from(prev.keys())) if (!orders.find(o => (o._id||o.id) === k)) prev.delete(k);
	}, [orders]);

	const stats = useMemo(() => {
		const totals = { total: 0, pending: 0, preparing: 0, completed: 0 };
		orders.forEach(o => {
			totals.total += 1;
			const s = (o.status || '').toLowerCase();
			if (s === 'pending') totals.pending += 1;
			else if (s === 'in_progress' || s === 'preparing' || s === 'cooking') totals.preparing += 1;
			else if (s === 'completed') totals.completed += 1;
		});
		return totals;
	}, [orders]);

	const statusOptions = ['pending','in_progress','preparing','cooking','ready','completed','cancelled'];

	const handleUpdateStatus = async (orderId, newStatus) => {
		if (!orderId || !axiosPublic) return;
		const confirm = await Swal.fire({
			title: 'Change status?',
			text: `Set to "${labelFor(newStatus)}"?`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Yes'
		});
		if (!confirm.isConfirmed) return;
		try {
			setUpdatingId(orderId);
			await axiosPublic.patch(`/orders/${orderId}`, { status: newStatus });
			await fetchOrders();
			Swal.fire({ icon: 'success', title: 'Status updated', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false });
		} catch (err) {
			console.error(err);
			Swal.fire('Error', err?.response?.data?.message || 'Update failed', 'error');
		} finally {
			setUpdatingId(null);
		}
	};

	const handleRemove = async (orderId) => {
		if (!orderId || !axiosPublic) return;
		const res = await Swal.fire({
			title: 'Remove order?',
			text: 'This will permanently delete the order. Continue?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, remove'
		});
		if (!res.isConfirmed) return;
		try {
			setRemovingId(orderId);
			await axiosPublic.delete(`/orders/${orderId}`);
			await fetchOrders();
			Swal.fire({ icon: 'success', title: 'Removed', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false });
		} catch (err) {
			console.error('Remove failed', err);
			Swal.fire('Error', err?.response?.data?.message || 'Failed to remove order', 'error');
		} finally {
			setRemovingId(null);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<NavBar />
			<div className="max-w-6xl mx-auto px-4 py-8 mt-14">
				<header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Chef Dashboard</h1>
						<p className="text-sm text-gray-500 mt-1">Manage kitchen orders</p>
					</div>
					
				</header>

				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
					<div className="bg-white rounded-lg shadow p-4">
						<div className="text-sm text-gray-500">Total Orders</div>
						<div className="mt-2 text-2xl font-bold text-gray-900">{stats.total}</div>
					</div>
					<div className="bg-white rounded-lg shadow p-4">
						<div className="text-sm text-gray-500">Pending</div>
						<div className="mt-2 text-2xl font-bold text-gray-900">{stats.pending}</div>
					</div>
					<div className="bg-white rounded-lg shadow p-4">
						<div className="text-sm text-gray-500">Preparing</div>
						<div className="mt-2 text-2xl font-bold text-gray-900">{stats.preparing}</div>
					</div>
					<div className="bg-white rounded-lg shadow p-4">
						<div className="text-sm text-gray-500">Completed</div>
						<div className="mt-2 text-2xl font-bold text-gray-900">{stats.completed}</div>
					</div>
				</section>

				<section className="bg-white rounded-lg shadow p-4">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
						<span className="text-sm text-gray-500">{orders.length} total</span>
					</div>

					{error && <div className="text-red-600 mb-4">{error}</div>}
					{loading && <div className="py-8 text-center text-gray-500">Loading orders...</div>}

					<ul className="space-y-3">
						{orders.map(order => {
							const id = order._id || order.id;
							const status = (order.status || 'unknown').toLowerCase();
							const items = Array.isArray(order.items) ? order.items : order.items ? [order.items] : [];
							const first = items[0] || null;
							const total = order.total ?? items.reduce((s,it) => s + (Number(it.price||it.cost||0)*(it.qty||1)), 0);
							return (
								<li key={id} className="flex items-center justify-between p-3 border rounded">
									<div className="flex items-center gap-4 min-w-0">
										<div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
											{first?.image ? <img src={first.image} alt={first.name} className="w-full h-full object-cover" /> : <span className="text-xl">🍽️</span>}
										</div>
										<div className="min-w-0">
											<div className="text-sm font-medium text-gray-900 truncate">Order #{String(id).slice(0,8)}</div>
											<div className="text-xs text-gray-500 truncate">{first?.name ? `${first.name} • ${items.length} item(s)` : `${items.length} item(s)`}</div>
										</div>
									</div>

									<div className="flex items-center gap-3">
										<select
											value={status}
											onChange={(e) => handleUpdateStatus(id, e.target.value)}
											disabled={updatingId === id}
											className="text-sm p-1 border rounded bg-white"
											aria-label={`Change status for order ${id}`}
										>
											{statusOptions.map(s => <option key={s} value={s}>{labelFor(s)}</option>)}
										</select>

										{updatingId === id && <svg className="w-4 h-4 ml-2 text-gray-500 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"></circle><path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path></svg>}

										<div className="text-right">
											<div className="text-sm font-bold text-orange-600">{formatCurrency(total)}</div>
											<div className="flex items-center justify-end gap-3">
												<button
													onClick={() => handleRemove(id)}
													disabled={removingId === id}
													className="text-sm text-red-600 hover:underline disabled:opacity-50"
												>
													{removingId === id ? 'Removing...' : 'Remove'}
												</button>
												<NavLink to={`/orders/${id}`} className="text-sm text-blue-600 hover:underline">Details</NavLink>
											</div>
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

export default ChefDashboard;