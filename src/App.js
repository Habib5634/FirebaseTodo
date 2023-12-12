import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Todo from './Components/Todo';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebasae';

function App() {
  const [user, loading] = useAuthState(auth);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked || loading) {
    // Loading state while checking authentication status
    return <div>Loading...</div>;
  }

  return (
    <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Todo />
            ) : (
              <Navigate
                replace
                to="/login"
                state={{
                  from: '/',
                }}
              />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
  );
}

export default App;
