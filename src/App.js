import React, { useState, useEffect } from "react";
import Login from "./Login";
import MapComponent from "./MapComponent";
import { auth } from "./firebase"; // Ensure this path is correct

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // No user is signed in.....
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return <div className="App">{user ? <MapComponent /> : <Login />}</div>;
}

export default App;
