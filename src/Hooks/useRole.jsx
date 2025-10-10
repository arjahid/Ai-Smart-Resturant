import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/provider/AuthProvider';
import useAxiosPublic from './AxiousPublic';

const useRole = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    
    if (!user?.email) {
      setRole(null);
      setLoading(false);
      return;
    }
    // setLoading(true);

    const fetchRole = async () => {
      try {
        const res = await axiosPublic.get(`/users/role/${user.email}`);
        setRole(res.data.role);
      } catch (err) {
        console.error("Error fetching user role:", err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user?.email, axiosPublic]);

  return { role, loading };
};

export default useRole;
