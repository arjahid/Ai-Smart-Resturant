import React, { createContext, useState, useEffect } from 'react';
import app from "../../firebase.config";
import useAxiosPublic from "../../Hooks/AxiousPublic";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // auth helpers
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn=(email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signOut = () => {
    setLoading(true);
    setUser(null);
    return firebaseSignOut(auth);
  };

  const updateUserProfile = (profile) => {
    if (!auth.currentUser) return Promise.reject(new Error('No authenticated user'));
    return updateProfile(auth.currentUser, profile);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);
    //   if(currentUser){
    //     const token=await currentUser.getIdToken();
    //     localStorage.setItem('access-token', token);
    //   }else{
    //       localStorage.removeItem('access-token');
    //   }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signOut,
    updateUserProfile,
    signInWithGoogle,
    axiosPublic
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;