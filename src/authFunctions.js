import { auth, provider, firestore } from "./firebase"; // Make sure the path to firebase.js is correct
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Function to sign in with Google
export async function signInWithGoogle() {
  try {
    // Sign in with Google
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Get additional user info
    const additionalUserInfo = getAdditionalUserInfo(result);
    const isNewUser = additionalUserInfo.isNewUser;

    // Create a user document in Firestore with the user's UID as the document ID
    if (isNewUser) {
      const userRef = doc(firestore, "users", user.uid);
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      // Set the user document data
      await setDoc(userRef, userData);
    }

    // Handle user login success
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    // Handle error
  }
}
