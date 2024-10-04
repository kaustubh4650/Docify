import React, { useState } from "react";
import logo from "../images/logo.png";
import { FaUser } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdEmail, MdOutlineWifiPassword } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import nameTag from "../images/nameTag.png";
import { json, Link, useNavigate } from "react-router-dom";
import rightImage from "../images/signUpRight.png";
import { api_base_url } from "../Helper";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const createUser = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: pwd,
        phone: phone,
        username: username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          setError(data.message);
        } else {
          navigate("/login");
        }
      });
  };

  return (
    <>
      <div className="flex overflow-hidden items-center w-screen flex-col justify-center h-screen bg-[#F0F0F0]">
        <div className="flex w-full items-center">
          <div className="left flex w-[30%] flex-col ml-[100px]">
            <img className="w-[210px]" src={logo} alt="" />
            <form onSubmit={createUser} className="pl-3 mt-5 " action="">
              <div className="inputCon ">
                <p className="text-[14px] text-[grey]">Username</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <FaUser />
                  </i>
                  <input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={username}
                    type="text"
                    placeholder="username"
                    name="username"
                    id="username"
                    required
                  />
                </div>
              </div>

              <div className="inputCon ">
                <p className="text-[14px] text-[grey]">Name</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <img src={nameTag} alt="" />
                  </i>
                  <input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    type="text"
                    placeholder="name"
                    name="name"
                    id="name"
                    required
                  />
                </div>
              </div>

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
                <p className="text-[14px] text-[grey]">Phone</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <FaPhone />
                  </i>
                  <input
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    value={phone}
                    type="text"
                    placeholder="phone"
                    name="phone"
                    id="phone"
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
                Already have an account{" "}
                <Link className="text-blue-500" to="/login">
                  Login
                </Link>
              </p>

              <div className="text-center">
                <button className="p-[10px] w-60 transition-all hover:bg-green-600 bg-green-500 text-white rounded-lg border-0  mt-3">
                  Sign Up
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

export default SignUp;
