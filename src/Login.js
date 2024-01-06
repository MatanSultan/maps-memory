import React from "react";
import { signInWithGoogle } from "./authFunctions";

export default function Login() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Login with Google</h2>
          <button
            onClick={signInWithGoogle}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
