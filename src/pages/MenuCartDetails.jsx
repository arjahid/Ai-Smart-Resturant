import React, { useContext, useMemo, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import useCart from '../Hooks/useCart';
import useAxiosPublic from '../Hooks/AxiousPublic';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import NavBar from '../components/NavBar';
import { AuthContext } from '../components/provider/AuthProvider';

const MenuCartDetails = () => {
	// support multiple return shapes from useCart
	const cartData = useCart();
	const cart = cartData?.cart ?? (Array.isArray(cartData) ? cartData[0] : []);
	const refetch = cartData?.refetch ?? cartData?.ref ?? (Array.isArray(cartData) ? cartData[1] : undefined);
	const isLoading = cartData?.isLoading ?? false;
	const error = cartData?.error ?? null;
	const {user}=useContext(AuthContext);

	const axiosPublic = useAxiosPublic();
	const [placingOrder, setPlacingOrder] = useState(false);
	const [removingId, setRemovingId] = useState(null);
	const [paying, setPaying] = useState(false);
	const [paymentSuccess, setPaymentSuccess] = useState(false);
	const [paymentError, setPaymentError] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('card');

	const navigate = useNavigate();

	// Normalize cart entries to consistent product data
	const normalized = useMemo(() => {
		return (cart || []).map((entry) => {
			const product = entry.item || entry.menuItem || entry.product || entry.menu || entry;
			const cartId = entry._id || entry.id || entry.cartId || null;
			const qty = entry.quantity || entry.qty || 1;
			return {
				cartId,
				id: product?._id || product?.id || null,
				name: product?.name || product?.title || 'Unnamed item',
				image: product?.image || product?.img || null,
				price: Number(product?.price ?? product?.cost ?? 0),
				category: product?.category || entry.category || '',
				qty: Number(qty) || 1,
				discount: Number(product?.discount ?? entry.discount ?? 0) || 0,
				raw: entry
			};
		});
	}, [cart]);

	// per item discounted price
	const itemsWithPrices = useMemo(() => {
		return normalized.map((it) => {
			const original = it.price;
			const discounted = it.discount > 0 ? original - (original * it.discount) / 100 : original;
			return { ...it, original, discounted };
		});
	}, [normalized]);

	// totals
	const totals = useMemo(() => {
		const subtotal = itemsWithPrices.reduce((s, it) => s + it.original * it.qty, 0);
		const totalAfterDiscount = itemsWithPrices.reduce((s, it) => s + it.discounted * it.qty, 0);
		const totalSavings = subtotal - totalAfterDiscount;
		return { subtotal, totalAfterDiscount, totalSavings };
	}, [itemsWithPrices]);

	const handleRemove = async (cartIdOrItemId) => {
		if (!cartIdOrItemId) return;

		const result = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		});

		if (!result.isConfirmed) return;

		try {
			setRemovingId(cartIdOrItemId);
			await axiosPublic.delete(`/menucart/${cartIdOrItemId}`); // adjust endpoint if needed
			if (typeof refetch === 'function') await refetch();

			await Swal.fire({
				title: 'Deleted!',
				text: 'Item removed from cart.',
				icon: 'success'
			});
		} catch (err) {
			console.error('Failed to remove item from cart:', err);
			await Swal.fire({
				title: 'Error',
				text: err?.response?.data?.message || 'Failed to remove item. Try again.',
				icon: 'error'
			});
		} finally {
			setRemovingId(null);
		}
	};

	const handlePayNow = async () => {
		setPaymentError('');
		setPaymentSuccess(false);
		setPaying(true);
		try {
			const payload = {
				items: itemsWithPrices.map((it) => ({
					id: it.id,
					name: it.name,
					qty: it.qty,
					price: it.original,
					discount: it.discount
				})),
				total: totals.totalAfterDiscount,
				method: paymentMethod
			};
			// simulate payment endpoint
			const res = await axiosPublic.post('/payments', payload);
			if (res.status >= 200 && res.status < 300) {
				setPaymentSuccess(true);
				if (typeof refetch === 'function') await refetch();
			} else {
				setPaymentError('Payment failed. Please try again.');
			}
		} catch (err) {
			console.error(err);
			setPaymentError(err.response?.data?.message || 'Payment failed. Check console.');
		} finally {
			setPaying(false);
		}
	};

	const format = (v) => `৳${v.toFixed(2)}`;

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
			</div>
		);
	}
	const handleOrder = async () => {
		if (itemsWithPrices.length === 0) {
			return Swal.fire('Cart empty', 'Add items to cart before placing an order.', 'info');
		}

		const confirm = await Swal.fire({
			title: 'Place order?',
			text: `This will create an order and clear your current cart (${itemsWithPrices.length} items). Proceed?`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Yes, place order'
		});
		if (!confirm.isConfirmed) return;

		setPlacingOrder(true);
		try {
			const orderPayload = {
				items: itemsWithPrices.map(it => ({
					id: it.id,
					name: it.name,
					qty: it.qty,
					price: it.original,
					discount: it.discount,
					image: it.image || null
				})),
				total: totals.totalAfterDiscount,
				createdAt: new Date().toISOString()
			};
			 const email=user?.email;
			

			const res = await axiosPublic.post(`/orders?email=${email}`, orderPayload);
			if (!(res.status >= 200 && res.status < 300)) {
				throw new Error('Order creation failed');
			}

			// Try bulk clear cart endpoint first
			// try {
			// 	await axiosPublic.delete('/menucart'); // backend may clear all cart items
			// } catch (bulkErr) {
			// 	// fallback: delete each cart entry individually
			// 	await Promise.all(
			// 		itemsWithPrices.map(it => {
			// 			const idToDelete = it.cartId || it.id;
			// 			if (!idToDelete) return Promise.resolve();
			// 			return axiosPublic.delete(`/menucart/${idToDelete}`).catch(()=>{});
			// 		})
			// 	);
			// }

			if (typeof refetch === 'function') await refetch();

			await Swal.fire('Order placed', 'Your order has been placed and cart cleared.', 'success');
		} catch (err) {
			console.error('Place order failed', err);
			await Swal.fire('Error', err?.response?.data?.message || err.message || 'Failed to place order', 'error');
		} finally {
			setPlacingOrder(false);
		}
	};


	return (
		<div className="min-h-screen bg-gray-50 py-8">
            <NavBar></NavBar>
			<div className="max-w-5xl mx-auto px-4 mt-4">
				{/* Top bar with back button */}
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center space-x-4">
						<button
							onClick={() => navigate(-1)}
							className="inline-flex items-center px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
						>
							<svg className="w-4 h-4 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
							</svg>
							<span className="text-sm font-medium text-gray-700">Back</span>
						</button>

						<div>
							<h2 className="text-2xl font-semibold">Your Cart</h2>
							<p className="text-sm text-gray-500">{itemsWithPrices.length} item(s)</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<NavLink to="/menu" className="text-sm text-blue-600 underline">Browse Menu</NavLink>
						{/* small utility */}
						<button onClick={() => typeof refetch === 'function' && refetch()} className="text-sm text-gray-600 hover:text-gray-900">Refresh</button>
					</div>
				</div>

				{error && (
					<div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
						<p className="text-sm">{String(error?.message || error)}</p>
						{typeof refetch === 'function' && (
							<button onClick={() => refetch()} className="mt-2 text-sm text-blue-600 underline">Retry</button>
						)}
					</div>
				)}

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* items list */}
					<div className="lg:col-span-2 space-y-4">
						{itemsWithPrices.length === 0 ? (
							<div className="text-gray-600 p-6 bg-white rounded-lg shadow">Your cart is empty.</div>
						) : (
							itemsWithPrices.map((item) => (
								<div key={item.cartId || item.id} className="flex items-center bg-white rounded-lg shadow p-4 hover:shadow-xl transition">
									<div className="w-28 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100 mr-4">
										{item.image ? (
											<img src={item.image} alt={item.name} className="w-full h-full object-cover" />
										) : (
											<div className="w-full h-full flex items-center justify-center text-2xl">🍽️</div>
										)}
									</div>

									<div className="flex-1 min-w-0">
										<h3 className="font-semibold text-gray-900">{item.name}</h3>
										{item.category && <div className="text-xs text-gray-500">{item.category}</div>}
										<div className="text-sm text-gray-600 mt-1">Qty: {item.qty}</div>
									</div>

									<div className="flex flex-col items-end ml-4">
										{item.discount > 0 ? (
											<div className="text-right">
												<div className="text-sm text-gray-500 line-through">{format(item.original)}</div>
												<div className="text-lg font-bold text-orange-600">{format(item.discounted)}</div>
												<div className="text-xs text-green-600 mt-1">-{item.discount}%</div>
											</div>
										) : (
											<div className="text-lg font-bold text-orange-600">{format(item.original)}</div>
										)}

										<button
											onClick={() => handleRemove(item.cartId || item.id)}
											disabled={removingId === (item.cartId || item.id)}
											className="mt-3 inline-flex items-center text-sm text-red-600 hover:underline disabled:opacity-50"
										> 
											{removingId === (item.cartId || item.id) ? 'Removing...' : <span className='text-2xl font-bold'><MdDelete /></span>}
										</button>
									</div>
								</div>
							))
						)}
					</div>

					{/* totals & payment */}
					<div className="bg-white rounded-lg shadow p-6 sticky top-24 h-fit">
						<h4 className="text-lg font-semibold mb-4">Order Summary</h4>
						<div className="space-y-3 text-sm text-gray-600">
							<div className="flex justify-between">
								<span>Subtotal</span>
								<span>{format(totals.subtotal)}</span>
							</div>
							<div className="flex justify-between">
								<span>Total Savings</span>
								<span className="text-green-600">-{format(totals.totalSavings)}</span>
							</div>
							<div className="flex justify-between items-center pt-3 border-t">
								<span className="font-semibold">Total</span>
								<span className="text-2xl font-bold text-orange-600">{format(totals.totalAfterDiscount)}</span>
							</div>
						</div>

						{/* payment method */}
						<div className="mt-4">
							<label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
							<div className="space-y-2">
								<label className={`flex items-center space-x-2 p-2 border rounded ${paymentMethod==='card' ? 'border-orange-300 bg-orange-50' : 'border-gray-200'}`}>
									<input type="radio" name="pm" value="card" checked={paymentMethod==='card'} onChange={() => setPaymentMethod('card')} />
									<span className="text-sm">Card</span>
								</label>
								<label className={`flex items-center space-x-2 p-2 border rounded ${paymentMethod==='bkash' ? 'border-orange-300 bg-orange-50' : 'border-gray-200'}`}>
									<input type="radio" name="pm" value="bkash" checked={paymentMethod==='bkash'} onChange={() => setPaymentMethod('bkash')} />
									<span className="text-sm">bKash</span>
								</label>
							</div>
						</div>

						{paymentError && <div className="mt-3 text-sm text-red-600">{paymentError}</div>}
						{paymentSuccess && <div className="mt-3 text-sm text-green-700">Payment successful. Thank you!</div>}

						<button
							onClick={handlePayNow}
							disabled={paying || itemsWithPrices.length === 0}
							className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 disabled:opacity-60"
						>
							{paying ? 'Processing Payment...' : `Pay Now — ${format(totals.totalAfterDiscount)}`}
						</button>

						<button
							onClick={handleOrder}
							disabled={placingOrder || itemsWithPrices.length === 0}
							className="mt-3 w-full border border-gray-200 bg-gradient-to-r rounded-lg from-orange-500 to-red-500 py-2 text-white hover:to-red-800 font-bold text-xl disabled:opacity-60"
						>
							{placingOrder ? 'Placing Order...' : 'Place Order'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MenuCartDetails;