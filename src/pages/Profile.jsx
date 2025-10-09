import React, { useContext } from 'react';
import { AuthContext } from '../components/provider/AuthProvider';

const Profile = () => {
	const { user } = useContext(AuthContext);

	return (
		<div className="min-h-screen bg-gray-50 py-10">
			<div className="max-w-4xl mx-auto px-4">
				<div className="bg-white rounded-2xl shadow p-6 md:p-8">
					<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
						{/* avatar */}
						<div className="flex-shrink-0">
							<div className="w-28 h-28 rounded-full border-4 border-orange-400 overflow-hidden bg-gray-100 flex items-center justify-center text-4xl text-white">
								{user?.photoURL ? (
									<img src={user.photoURL} alt={user?.displayName || user?.email} className="w-full h-full object-cover" />
								) : (
									<span>{String(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}</span>
								)}
							</div>
						</div>

						{/* personal info */}
						<div className="flex-1 min-w-0">
							<h1 className="text-2xl md:text-3xl font-bold text-gray-900 truncate">
								{user?.displayName || 'Unnamed User'}
							</h1>
							<p className="text-sm text-gray-500 mt-1">{user?.email || 'No email provided'}</p>

							<div className="mt-4 flex flex-wrap gap-3">
								<button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow hover:scale-[1.02] transition">
									Edit Profile
								</button>
								<button className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition">
									Settings
								</button>
							</div>
						</div>

						{/* quick stats */}
						<div className="w-full md:w-40">
							<div className="bg-gray-50 rounded-lg p-3 text-center">
								<div className="text-xs text-gray-500">Orders</div>
								<div className="text-xl font-semibold text-gray-900 mt-1">—</div>
							</div>
						</div>
					</div>

					{/* sections */}
					<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Personal details card */}
						<div className="bg-white border rounded-lg p-4 shadow-sm">
							<h2 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h2>
							<div className="text-sm text-gray-700 space-y-2">
								<div><span className="font-medium">Name:</span> {user?.displayName || 'N/A'}</div>
								<div><span className="font-medium">Email:</span> {user?.email || 'N/A'}</div>
								<div><span className="font-medium">Member since:</span> {user?.metadata?.creationTime ?? '—'}</div>
                                <div></div>
							</div>
						</div>

						{/* Order history */}
						<div className="bg-white border rounded-lg p-4 shadow-sm">
							<h2 className="text-lg font-medium text-gray-900 mb-3">Order History</h2>
							<ul className="space-y-3">
								{/* placeholder items — replace with real data when available */}
								<li className="flex items-center justify-between p-3 border rounded">
									<div>
										<div className="text-sm font-semibold">Order #123</div>
										<div className="text-xs text-gray-500">2 items • 2023-09-01</div>
									</div>
									<div className="text-right">
										<div className="text-sm font-bold text-orange-600">৳25.00</div>
										<div className="text-xs text-green-600">Delivered</div>
									</div>
								</li>

								<li className="flex items-center justify-between p-3 border rounded">
									<div>
										<div className="text-sm font-semibold">Order #124</div>
										<div className="text-xs text-gray-500">1 item • 2023-09-05</div>
									</div>
									<div className="text-right">
										<div className="text-sm font-bold text-orange-600">৳30.00</div>
										<div className="text-xs text-yellow-500">Preparing</div>
									</div>
								</li>

								{/* end placeholder */}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;