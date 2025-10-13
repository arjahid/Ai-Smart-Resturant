import React, { useContext } from 'react';
import { AuthContext } from '../components/provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
			</div>
		);
	}

	if (user) {
		return <>{children}</>;
	}

	return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouter;