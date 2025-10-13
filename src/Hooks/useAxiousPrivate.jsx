import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// use env var with fallback
const axiosSecure = axios.create({
baseURL: 'http://localhost:3600/',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // add interceptors and keep references so we can eject on cleanup
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          // navigate to login on auth errors
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // eject interceptors when component unmounts / hook re-runs
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
