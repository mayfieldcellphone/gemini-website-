import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: () => Promise<void>;
  loginWithRedirect: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRedirect = async () => {
      try {
        await getRedirectResult(auth);
      } catch (error) {
        console.error("Redirect login failed:", error);
      }
    };
    checkRedirect();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          // Simple admin check: either fixed email or check in 'admins' collection
          const adminDoc = await getDoc(doc(db, 'admins', user.uid));
          const isEmailAdmin = user.email?.toLowerCase() === 'mayfieldcellphonerepairs@gmail.com'.toLowerCase();
          setIsAdmin(adminDoc.exists() || isEmailAdmin);
        } catch (error) {
          console.error("Admin check failed:", error);
          const isEmailAdmin = user.email?.toLowerCase() === 'mayfieldcellphonerepairs@gmail.com'.toLowerCase();
          setIsAdmin(isEmailAdmin);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.code === 'auth/popup-blocked') {
        alert("Popups were blocked by your browser. Please allow popups or use the 'Login with Redirect' option.");
      } else if (error.code === 'auth/unauthorized-domain') {
        const domain = window.location.hostname;
        alert(`ACCESS DENIED: The domain "${domain}" is not authorized in your Firebase Project.\n\nREAL SOLUTION:\n1. Open Firebase Console\n2. Go to Authentication > Settings > Authorized domains\n3. Add "${domain}" to the list.\n4. Wait 5 minutes and try again.`);
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Ignore user cancellation
      } else {
        alert("Login failed: " + error.message);
      }
    }
  };

  const loginWithRedirect = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      console.error("Redirect login failed:", error);
      if (error.code === 'auth/unauthorized-domain') {
        const domain = window.location.hostname;
        alert(`ACCESS DENIED: The domain "${domain}" is not authorized in your Firebase Project.\n\nREAL SOLUTION:\n1. Open Firebase Console\n2. Go to Authentication > Settings > Authorized domains\n3. Add "${domain}" to the list.\n4. Wait 5 minutes and try again.`);
      } else {
        alert("Redirect login failed: " + error.message);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, loginWithRedirect, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
