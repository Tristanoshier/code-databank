import React, { useContext, useState, useEffect } from "react";
import { TokenContext } from "../../App";
import axios from "axios";
import "./Dashboard-Styles.css";
import DashboardDisplay from "./DashboardDisplay";

const DashboardIndex = ({ postActive, postOn, postOff, getPosts }) => {
  const [user, setUser] = useState([]);
  const token = useContext(TokenContext);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const data = await axios
        .get("http://localhost:3000/user/loggedInUser", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        });
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <DashboardDisplay
        user={user}
        postActive={postActive}
        postOn={postOn}
        postOff={postOff}
        getPosts={getPosts}
      />
    </div>
  );
};

export default DashboardIndex;
