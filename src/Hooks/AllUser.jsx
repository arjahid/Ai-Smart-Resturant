import React, { useEffect, useState } from 'react';
import useAxiosPublic from './AxiousPublic';

const AllUser = () => {
    const [users,setUsers]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)
    const axiosPublic=useAxiosPublic();
    

    useEffect(()=>{
        axiosPublic.get('/users')
        .then(res=>res.data)
        .then(data=>{
            setUsers(data);
            setLoading(false);
        })
        .catch(err=>{
            setError(err);
            setLoading(false);
        });
    },[])

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error.message}</div>;
    return {users,loading,error};
}

export default AllUser;