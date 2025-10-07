import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/AxiousPublic';

const AddMenu = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
    isAvailable: true,
    aiTags: '',
    discount: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Starter', 'Main Course', 'Appetizer', 'Beverage', 'Dessert', 'Snack'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!form.category) return 'Please select a category';
    if (!form.price || Number(form.price) <= 0) return 'Price must be a positive number';
    if (form.discount !== '' && (Number(form.discount) < 0 || Number(form.discount) > 100)) return 'Discount must be between 0 and 100';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category,
        price: Number(form.price),
        discount: form.discount === '' ? 0 : Number(form.discount),
        image: form.image?.trim() || null,
        isAvailable: !!form.isAvailable,
        aiTags: form.aiTags
          ? form.aiTags.split(',').map(t => t.trim()).filter(Boolean)
          : []
      };

      const res = await axiosPublic.post('/menu', payload);
      if (res.status >= 200 && res.status < 300) {
        navigate('/menu');
      } else {
        setError('Failed to add menu item. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-4">Add Menu Item</h2>

        {error && <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input name="name" value={form.name} onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="">Select category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (৳) *</label>
              <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input name="discount" value={form.discount} onChange={handleChange} type="number" step="0.1" min="0" max="100"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image Link</label>
              <input name="image" value={form.image} onChange={handleChange}
                placeholder="https://i.ibb.co/7KQmR7v/caesar-salad.jpg"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input type="checkbox" name="isAvailable" checked={form.isAvailable} onChange={handleChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-700">Available</span>
            </label>

            <div className="ml-auto w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">AI Tags (comma separated)</label>
              <input name="aiTags" value={form.aiTags} onChange={handleChange}
                placeholder="low-calorie, healthy, vegetarian"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button type="submit" disabled={loading}
              className={`bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded font-semibold transition transform ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'}`}>
              {loading ? 'Saving...' : 'Add Menu Item'}
            </button>

            <button type="button" onClick={() => navigate('/menu')}
              className="text-sm text-gray-600 hover:text-gray-900">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;