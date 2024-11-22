import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../Firebase";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const AuthContext = createContext({ currentUser: null });

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      localStorage.setItem("isLoggedIn", JSON.stringify(user));
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Optionally, show a loading spinner
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
