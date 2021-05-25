// Hustin branch

import React, { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/Site/Layout";
import FeedIndexProvider from "./components/Feed/FeedIndex";
import FeedDisplayProvider from "./components/Feed/FeedDisplay";
import FeedCardProvider from "./components/Feed/FeedCard";
export const TokenContext = React.createContext();

function App() {
  const [token, setToken] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("firstName")) {
      setFirstName(localStorage.getItem("firstName"));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("id")) {
      setUserId(localStorage.getItem("id"));
    }
  });

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const updatedFirstName = (newFirstName) => {
    localStorage.setItem("firstName", newFirstName);
    setFirstName(newFirstName);
    console.log(firstName);
  };

  const updatedUserId = (newId) => {
    localStorage.setItem("id", newId);
  };

  const clearToken = () => {
    localStorage.clear();
    setToken("");
  };

  const protectedViews = () => {
    return (token === localStorage.getItem("token")) |
      (localStorage.getItem("token") === !undefined) ? (
      <TokenContext.Provider value={token}>
        <MainLayout clickLogout={clearToken} firstName={firstName} />
      </TokenContext.Provider>
    ) : (
      <Auth
        updateToken={updateToken}
        updatedFirstName={updatedFirstName}
        updatedUserId={updatedUserId}
      />
    );
  };

  return <div className="App">{protectedViews()}</div>;
}

export default App;
