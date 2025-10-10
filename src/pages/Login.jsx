import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../components/provider/AuthProvider';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message || '';
    const from = location.state?.from?.pathname || '/';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleForm = async (e) => {
        e.preventDefault();
        setError('');
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setLoading(true);
        try {
            const result = await signIn(email, password);
            console.log('Signed in user:', result.user);
           
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Login error:', err);
            setError(err?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-8 px-4">
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-6 py-8 sm:px-8">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                                <p className="text-gray-600 text-sm sm:text-base">Sign in to your account</p>
                            </div>

                            
                            {message && (
                                <div className="mb-4 text-sm text-red-800 bg-red-50 p-3 rounded">
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleForm} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full ${loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                                >
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    New Here?
                                    <Link to='/register' className="text-green-600 hover:text-green-500 font-medium ml-1 hover:underline">
                                        Create an account
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;