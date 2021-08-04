import React, { useContext, useState, useEffect } from "react";
import { TokenContext } from "../../../../../App";
import "./Dashboard-Styles.css";
import DashboardDisplay from "./DashboardDisplay";
import APIURL from "../../../../../helpers/environment";

const DashboardIndex = ({ postActive, postOn, postOff, getPosts, posts }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const getUser = () => {
    fetch(`${APIURL}/user/loggedInUser`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      });
  };

  return (
    <div>
      <DashboardDisplay
        loading={loading}
        user={user}
        postActive={postActive}
        postOn={postOn}
        postOff={postOff}
        getPosts={getPosts}
        posts={posts}
      />
    </div>
  );
};

export default DashboardIndex;
