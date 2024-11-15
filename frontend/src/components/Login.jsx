import React, { useState } from "react";
import logo from "../images/logo.png";
import { IoEye } from "react-icons/io5";
import { MdEmail, MdOutlineWifiPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import rightImage from "../images/loginRight.png";
import { api_base_url } from "../Helper";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success === true) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          setTimeout(() => {
            navigate("/");
          }, 100);
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-[#F0F0F0]">
        <div className="flex flex-col lg:flex-row items-center w-full max-w-screen-lg mx-auto">

          <div className="w-full lg:w-1/2 px-6 lg:px-12 flex flex-col">
            <img className="w-48 mx-auto lg:mx-0" src={logo} alt="Logo" />
            <form
              onSubmit={login}
              className="mt-6 flex flex-col gap-4"
              action=""
            >

              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm text-gray-600 mb-1"
                >
                  Email
                </label>
                <div className="flex items-center border rounded px-3 py-2">
                  <MdEmail className="text-gray-500 mr-2" />
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                    required
                    className="flex-1 bg-transparent focus:outline-none text-sm"
                  />
                </div>
              </div>


              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-600 mb-1"
                >
                  Password
                </label>
                <div className="flex items-center border rounded px-3 py-2">
                  <MdOutlineWifiPassword className="text-gray-500 mr-2" />
                  <input
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    id="password"
                    required
                    className="flex-1 bg-transparent focus:outline-none text-sm"
                  />
                  <IoEye className="text-gray-500 cursor-pointer ml-2" />
                </div>
              </div>


              {error && <p className="text-red-500 text-sm">{error}</p>}


              <p className="text-sm">
                Don't have an account?{" "}
                <Link className="text-blue-500" to="/signup">
                  Sign Up
                </Link>
              </p>


              <button
                type="submit"
                disabled={loading}
                className={`p-3 rounded-lg text-white transition ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
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
                  "Login"
                )}
              </button>
            </form>
          </div>


          <div className="hidden lg:flex w-1/2 items-center justify-center">
            <img className="w-3/4" src={rightImage} alt="Right Section" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
