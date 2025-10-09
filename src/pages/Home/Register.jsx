import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/provider/AuthProvider';
import Swal from 'sweetalert2';

const Register = () => {
	const { createUser, updateUserProfile, axiosPublic } = useContext(AuthContext);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		confirm: '',
		role: 'customer' 
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
		setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const { name, email, password, confirm, role } = form;
		if (!name.trim() || !email.trim() || !password) {
			setError('Please fill all required fields.');
			return;
		}
		if (!role) {
			setError('Please select a role.');
			return;
		}
		if (password !== confirm) {
			setError('Passwords do not match.');
			return;
		}
		if (password.length < 6) {
			setError('Password should be at least 6 characters.');
			return;
		}

		setLoading(true);
		try {
			const res = await createUser(email, password);
			if (res?.user) {
				await updateUserProfile({ displayName: name.trim() });

				// send user record to backend if axiosPublic is available
				try {
					if (axiosPublic) {
						await axiosPublic.post('/users', {
							name: name.trim(),
							email: email.trim(),
							role: role
						});
					}
				} catch (backendErr) {
					// log but don't block registration UI
					console.error('Failed to save user to backend:', backendErr);
				}

				await Swal.fire({ icon: 'success', title: 'Registered', text: 'Account created successfully.' });
				navigate('/');
			}
		} catch (err) {
			console.error(err);
			setError(err?.message || 'Registration failed.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
			<div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
				<h2 className="text-2xl font-bold mb-2 text-gray-900 text-center">Create an account</h2>
				<p className="text-sm text-gray-500 mb-6 text-center">Join AI Smart Restaurant to manage orders and menus</p>

				{error && <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">{error}</div>}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
						<input name="name" value={form.name} onChange={handleChange} required
							className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
						<input name="email" type="email" value={form.email} onChange={handleChange} required
							className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
							<input name="password" type="password" value={form.password} onChange={handleChange} required
								className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Confirm</label>
							<input name="confirm" type="password" value={form.confirm} onChange={handleChange} required
								className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
						</div>
					</div>

					{/* Role select */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
						<select
							name="role"
							value={form.role}
							onChange={(e) => setForm(prev => ({ ...prev, role: e.target.value }))}
							className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
						>
							<option value="customer">Customer</option>
							<option value="chef">Chef</option>
							<option value="admin">Admin</option>
						</select>
					</div>

					<button type="submit" disabled={loading}
						className={`w-full py-3 rounded-lg text-white font-semibold ${loading ? 'bg-orange-300 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'}`}>
						{loading ? 'Creating account...' : 'Create Account'}
					</button>

					<div className="text-center text-sm text-gray-500">
						Already have an account? <button type="button" onClick={() => navigate('/login')} className="text-blue-600 underline">Sign in</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;