// Develop Branch

import React, { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/Site/Layout";

function App() {
  const [token, setToken] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  useEffect(() => {
    if (localStorage.getItem("firstName")) {
      setFirstName(localStorage.getItem("firstName"));
    }
  }, []);

  const updatedFirstName = (newFirstName) => {
    localStorage.setItem("firstName", newFirstName);
    setFirstName(newFirstName);
    console.log(firstName);
  };

  const clearToken = () => {
    localStorage.clear();
    setToken("");
  };

  const protectedViews = () => {
    return (token === localStorage.getItem("token")) |
      (localStorage.getItem("token") === !undefined) ? (
      <MainLayout
        clickLogout={clearToken}
        token={token}
        firstName={firstName}
      />
    ) : (
      <Auth updateToken={updateToken} updatedFirstName={updatedFirstName} />
    );
  };

  return <div className="App">{protectedViews()}</div>;
}

export default App;
