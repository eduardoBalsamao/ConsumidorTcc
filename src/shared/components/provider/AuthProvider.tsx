import {useState, useEffect} from 'react';
import {auth} from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import firebase from 'firebase/compat/app';

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] =  useState(true);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);
  
  return <AuthContext.Provider value={user}>{!loading && children}</AuthContext.Provider>;
};