import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup } from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

export default function OAuth() {
  const navigate = useNavigate();

  async function onGoogleClick() {
    try {
      const auth = getAuth(); // Retrieve the Firebase authentication object.
      const provider = new GoogleAuthProvider(); // Create a Google authentication provider.
      const result = await signInWithPopup(auth, provider); // Perform the sign-in process with a Google popup.
      const user = result.user; // Get the information of the signed-in user.

      // Check the user
      const docRef = doc(db, "users", user.uid); // Create a document reference in the Firestore collection to store the user's credentials.
      const docSnap = await getDoc(docRef); // Get the document and check if it exists.

      if (!docSnap.exists()) {
        // If the document does not exist, create a new one.
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/"); // Redirect the user to the homepage.
    } catch (error) {
      toast.error("Could not authorize with Google"); // Show an error message if an error occurs.
    }
  }

  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex items-center justify-center w-full bg-red-600 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-200 ease-in-out rounded-2xl"
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" /> Continue with
      Google
    </button>
  );
}
