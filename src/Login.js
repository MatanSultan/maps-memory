// src/Login.js
import React from "react";
import { auth } from "./firebase";
import { signInWithGoogle } from "./authFunctions";

export default function Login() {
  return (
    <div className="login-container">
      <button onClick={signInWithGoogle}>Login with Google</button>
    </div>
  );
}
