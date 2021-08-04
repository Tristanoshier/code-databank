import React, { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import MainLayout from "./Components/Site/MainLayout";
export const TokenContext = React.createContext();
export const UpdateTokenContext = React.createContext();
export const FirstNameContext = React.createContext();
export const UpdatedUserIdContext = React.createContext();

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

  // ******* OLD UPDATETOKEN FUNC IF NEW ONE CAUSES ISSUES *******
  // const updateToken = (newToken) => {
  //   localStorage.setItem("token", newToken);
  //   setToken(newToken);
  // };

  const updateToken = (newToken) => {
    if (newToken === undefined) {
      return;
    } else {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    }
  };

  const updatedFirstName = (newFirstName) => {
    localStorage.setItem("firstName", newFirstName);
    setFirstName(newFirstName);
  };

  const updatedUserId = (newId) => {
    localStorage.setItem("id", newId);
  };

  const clearToken = () => {
    localStorage.clear();
    setToken("");
  };

  const expirationDuration = 1000 * 60 * 60 * 24;
  let now = new Date().getTime();
  let setupTime = localStorage.getItem("setupTime");
  if (setupTime == null) {
    localStorage.setItem("setupTime", now);
  } else {
    if (now - setupTime > expirationDuration) {
      localStorage.clear();
      localStorage.setItem("setupTime", now);
    }
  }

  return (
    <div className="App">
      <TokenContext.Provider value={token}>
        <UpdateTokenContext.Provider value={updateToken}>
          <FirstNameContext.Provider value={updatedFirstName}>
            <UpdatedUserIdContext.Provider value={updatedUserId}>
              <MainLayout clickLogout={clearToken} firstName={firstName} />
            </UpdatedUserIdContext.Provider>
          </FirstNameContext.Provider>
        </UpdateTokenContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
