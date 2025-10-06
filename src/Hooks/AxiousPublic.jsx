import axios from 'axios';

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'http://localhost:3600/',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // // Request interceptor
    // axiosPublic.interceptors.request.use(
    //     (config) => {
    //         console.log('Request sent:', config);
    //         return config;
    //     },
    //     (error) => {
    //         console.error('Request error:', error);
    //         return Promise.reject(error);
    //     }
    // );

    // // Response interceptor
    // axiosPublic.interceptors.response.use(
    //     (response) => {
    //         console.log('Response received:', response);
    //         return response;
    //     },
    //     (error) => {
    //         console.error('Response error:', error);
    //         if (error.response?.status === 404) {
    //             console.error('Resource not found');
    //         } else if (error.response?.status >= 500) {
    //             console.error('Server error');
    //         }
    //         return Promise.reject(error);
    //     }
    // );

    return axiosPublic;
};

export default useAxiosPublic;
