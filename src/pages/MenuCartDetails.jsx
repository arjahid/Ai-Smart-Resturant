import React from 'react';
import useCart from '../Hooks/useCart';
import axios from 'axios';
import useAxiosPublic from '../Hooks/AxiousPublic';

const MenuCartDetails = () => {
    const {cart,ref}=useCart();
    console.log('details',cart);
    
   
    return (
        <div> AxiousPublic.ge
            {cart.map(item => (
                <div key={item.id}>
                    <h3>{item._id}</h3>
                    <p>Price: ${item.price}</p>
                </div>
            ))}
        </div>
    );
};

export default MenuCartDetails;