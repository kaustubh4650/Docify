import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CreateDocs from "./components/CreateDocs";

const App = () => {

  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createDocs/:docsId" element={isLoggedIn ? <CreateDocs /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
