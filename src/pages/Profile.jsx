import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [editDetail, setEditDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        // update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // update name in the firestore

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Could not update profile detail");
    }
  }

  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
      <div className="w-full md:w-[50%] mt-6 px-3">
        <form>
          {/* name */}
          <input
            type="name"
            id="name"
            value={name}
            disabled={!editDetail}
            onChange={onChange}
            className={`w-full px-4 py-2 text-2xl text-gray-600 bg-white border border-gray-300 rounded-xl transition ease-in-out mb-6 ${
              editDetail && "bg-red-300 focus:bg-red-300"
            }`}
          />
          {/* email */}
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="w-full px-4 py-2 text-2xl text-gray-600 bg-white border border-gray-300 rounded-xl transition ease-in-out mb-6"
          />
          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
            <p className="flex items-center mb-6">
              Do you want to change your name ?
              <span
                onClick={() => {
                  editDetail && onSubmit();
                  setEditDetail((prevState) => !prevState);
                }}
                className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-2 cursor-pointer"
              >
                {editDetail ? "Apply change" : "Edit"}
              </span>
            </p>
            <p
              onClick={onLogout}
              className="text-blue-600 hover:text-blue-900 transition ease-in-out duration-200 cursor-pointer "
            >
              Sign Out
            </p>
          </div>
        </form>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded-2xl shadow-md hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
        >
          <Link
            to="/create-listing"
            className="flex justify-center items-center"
          >
            <FcHome className="mr-1 text-2xl bg-red-200 rounded-full p-1 border-2" />
            Sell or rent your home
          </Link>
        </button>
      </div>
    </section>
  );
}
