import React, { useState, useCallback, useEffect } from 'react';
import AllUser from '../../../Hooks/AllUser';
import useAxiosPublic from '../../../Hooks/AxiousPublic';
import Swal from 'sweetalert2';

const User = () => {
	const { users = [], refetch } = AllUser();
	const axiosPublic = useAxiosPublic();
	const [processingId, setProcessingId] = useState(null);
	// local copy for optimistic updates / instant UI refresh
	const [localUsers, setLocalUsers] = useState(users);

	// keep localUsers in sync when source users changes (e.g. initial load or refetch)
	useEffect(() => {
		setLocalUsers(users);
	}, [users]);

	const changeRole = useCallback(
		async (userId, newRole) => {
			if (!userId || !newRole) return;
			const confirmed = await Swal.fire({
				title: 'Change role?',
				text: `Set this user role to "${newRole}"?`,
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Yes, change',
			});
			if (!confirmed.isConfirmed) return;

			try {
				setProcessingId(userId);
				// optimistic update
				setLocalUsers((prev) =>
					prev.map((u) => ( (u._id || u.id) === userId ? { ...u, role: newRole } : u ))
				);
				// server call
				await axiosPublic.patch(`/users/${userId}`, { role: newRole });
				Swal.fire('Updated', 'User role updated.', 'success');
				// ensure canonical data
				if (typeof refetch === 'function') await refetch();
			} catch (err) {
				console.error(err);
				Swal.fire('Error', err?.response?.data?.message || 'Failed to update role', 'error');
				// rollback to server state
				if (typeof refetch === 'function') await refetch();
			} finally {
				setProcessingId(null);
			}
		},
		[axiosPublic, refetch]
	);

	const removeUser = useCallback(
		async (userId) => {
			if (!userId) return;
			const confirmed = await Swal.fire({
				title: 'Delete user?',
				text: 'This will permanently remove the user. Continue?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes, delete',
			});
			if (!confirmed.isConfirmed) return;

			try {
				setProcessingId(userId);
				// optimistic remove from UI
				setLocalUsers((prev) => prev.filter((u) => (u._id || u.id) !== userId));
				// server deletion
				await axiosPublic.delete(`/users/${userId}`);
				Swal.fire('Deleted', 'User removed.', 'success');
				// ensure canonical data
				if (typeof refetch === 'function') await refetch();
			} catch (err) {
				console.error(err);
				Swal.fire('Error', err?.response?.data?.message || 'Failed to delete user', 'error');
				// rollback to server state
				if (typeof refetch === 'function') await refetch();
			} finally {
				setProcessingId(null);
			}
		},
		[axiosPublic, refetch]
	);

	return (
		<section className="bg-white rounded-lg shadow p-6">
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-xl font-semibold">User Management</h1>
				<span className="text-sm text-gray-500">{(localUsers || users).length} users</span>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full text-left">
					<thead>
						<tr className="text-sm text-gray-600 border-b">
							<th className="py-2">User</th>
							<th className="py-2">Email</th>
							<th className="py-2">Role</th>
							<th className="py-2 text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{(localUsers || users).map((u) => {
							const id = u._id || u.id || u.email;
							const initials = (u.name || u.displayName || u.email || 'U').charAt(0).toUpperCase();
							return (
								<tr key={id} className="border-b last:border-b-0">
									<td className="py-3">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-lg font-medium text-slate-700 overflow-hidden">
												{u.photoURL ? <img src={u.photoURL} alt={u.name} className="w-full h-full object-cover" /> : initials}
											</div>
											<div>
												<div className="font-medium text-sm">{u.name || u.displayName || 'Unnamed'}</div>
												<div className="text-xs text-gray-400">{u?.meta?.joined || ''}</div>
											</div>
										</div>
									</td>

									<td className="py-3 text-sm text-gray-700">{u.email}</td>

									<td className="py-3">
										<select
											value={u.role || 'customer'}
											onChange={(e) => changeRole(id, e.target.value)}
											disabled={processingId === id}
											className="border rounded px-2 py-1 text-sm bg-white"
										>
											<option value="customer">Customer</option>
											<option value="chef">Chef</option>
											<option value="admin">Admin</option>
										</select>
									</td>

									<td className="py-3 text-right">
										<button
											onClick={() => removeUser(id)}
											disabled={processingId === id}
											className="text-sm text-red-600 hover:underline disabled:opacity-50 mr-3"
										>
											{processingId === id ? 'Processing...' : 'Delete'}
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default User;