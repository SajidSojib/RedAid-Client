import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from '../../firebase.init';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword( auth, email, password );
    };

    const logOutUser = () => {
      setLoading(false);
      return signOut(auth);
    };

    const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUserData = (name, photo) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    };
    const [token , setToken] = useState('');
    const userInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        logOutUser,
        signInUser,
        updateUserData,
        token
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          const tk= await currentUser.getIdToken(true);
          setToken(tk);
        }
        setLoading(false);
      });
      return () => {
        unsubscribe();
      };
    }, []);
    
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;