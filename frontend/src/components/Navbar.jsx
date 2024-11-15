import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import { RiSearchLine } from "react-icons/ri";
import Avatar from "react-avatar";
import { api_base_url } from "../Helper";

import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    setLoading(true)
    fetch(api_base_url + "/logout", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  };

  const getUser = () => {
    fetch(api_base_url + "/getUser", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setError(data.message);
        } else {
          setData(data.user);
        }
      });
  };

  return (
    <div className="navbar flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-[100px] h-[70px] sm:h-[90px] bg-[#F4F4F4]">

      <img src={logo} alt="Logo" className="h-10 sm:h-12 object-contain" />


      <div className="right flex items-center gap-3 sm:gap-4">
        <Avatar
          className="cursor-pointer"
          name={data ? data.name : ""}
          size="36"
          round="50%"
        />


        <button
          onClick={logout}
          disabled={loading} // Disable button while loading
          className={`p-3 rounded-lg text-white transition ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
