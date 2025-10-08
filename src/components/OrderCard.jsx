import React from 'react';
import useOrder from '../Hooks/useOrder';

const OrderCard = () => {
    const {orders } = useOrder()
    
    return (
        <div>
            <h2 className='text-3xl font-bold text-center my-4'>All Orders: {orders.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {orders.map(order => (
                    <div key={order._id} className='border p-4 rounded-lg shadow'>
                        <h3 className='text-xl font-semibold mb-2'>Order ID: {order._id}</h3>
                        <p>Status: {order.status}</p>
                        <p>Total: ${order.total}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderCard;