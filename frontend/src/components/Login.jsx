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

  const login = (e) => {
    e.preventDefault();
    console.log("Attempting login with:", email, pwd); // Log login attempt
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
        console.log("Login response:", data); // Log response from server
        if (data.success === true) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          setTimeout(() => {
            navigate("/");
          }, 100)

        } else {
          setError(data.message);
        }
      }).catch((error) => console.error("Error during login:", error)); // Log any errors

  };

  return (
    <>
      <div className="flex overflow-hidden items-center w-screen flex-col justify-center h-screen bg-[#F0F0F0]">
        <div className="flex w-full items-center">
          <div className="left flex w-[30%] flex-col ml-[100px]">
            <img className="w-[210px]" src={logo} alt="" />
            <form onSubmit={login} className="pl-3 mt-5 " action="">
              <div className="inputCon ">
                <p className="text-[14px] text-[grey]">Email</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <MdEmail />
                  </i>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
              </div>

              <div className="inputCon ">
                <p className="text-[14px] text-[grey]">Password</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <MdOutlineWifiPassword />
                  </i>
                  <input
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    value={pwd}
                    type="password"
                    placeholder="password"
                    name="password"
                    id="password"
                    required
                  />
                  <i className="cursor-pointer !mr-3 !text-[25px]">
                    <IoEye />
                  </i>
                </div>
              </div>

              <p className="text-red-500 ml-5 text-[14px]">{error}</p>

              <p className="ml-5 ">
                Don't have an account ?
                <Link className="text-blue-500 ml-2" to="/signup">
                  SignUp
                </Link>
              </p>

              <div className="text-center">
                <button className="p-[10px] w-60 transition-all hover:bg-green-600 bg-green-500 text-white rounded-lg border-0  mt-3">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="right w-[60%] flex items-end justify-end">
            <img className="h-full mt-8 mr-[200px]" src={rightImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
