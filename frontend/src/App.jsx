import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CreateDocs from "./components/CreateDocs";

const App = () => {

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} /> */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/createDocs/:docsId" element={isLoggedIn ? <CreateDocs /> : <Navigate to="/login" />} /> */}
          <Route path="/createDocs/:docsId" element={<ProtectedRoute><CreateDocs /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
