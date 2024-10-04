import React, { useState } from "react";
import logo from "../images/logo.png";
import { RiSearchLine } from "react-icons/ri";
import Avatar from "react-avatar";
import { api_base_url } from "../Helper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    getUser()
  }, [])

  const logout = () => {
    fetch(api_base_url + "/logout", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json())
      .then(data => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        navigate("/login")
      })

  }

  const getUser = () => {
    fetch(api_base_url + "/getUser", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success === false) {
        setError(data.message)
      }
      else {
        setData(data.user)
      }
    })
  }


  return (
    <>
      <div className="navbar flex items-center px-[100px] h-[90px] justify-between bg-[#F4F4F4]">
        <img src={logo} alt="" />

        <div className="right flex items-center gap-2">
          <div className="inputBox">
            <i>
              <RiSearchLine />
            </i>
            <input type="text" placeholder="search here...!" />
          </div>
          <Avatar
            className="cursor-pointer"
            name={data ? data.name : ""}
            size="40"
            round="50%"
          />
          <button onClick={logout} className="p-[10px] min-w-[80px] bg-red-500 text-white rounded-lg transition-all hover:bg-red-600">Logout</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
