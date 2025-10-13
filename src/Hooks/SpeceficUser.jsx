import { useEffect, useState } from 'react';
import useAxiosPublic from './AxiousPublic';

const useSpecificUser = (email) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();
 

  useEffect(() => {
    if (!email) return;

    setLoading(true);
    axiosPublic.get(`/users?email=${email}`)
      .then(res => setUser(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));

  }, [email]); // email change হলে পুনরায় fetch হবে

  return { user, loading, error };
};

export default useSpecificUser;
