import React, { useContext, useState, useEffect } from "react";
import { TokenContext } from "../../App";
import axios from "axios";
import "./Dashboard-Styles.css";
import DashboardDisplay from "./DashboardDisplay";

const DashboardIndex = ({ postActive, postOn, postOff, getPosts, posts }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useContext(TokenContext);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch("http://localhost:3000/user/loggedInUser", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      });
    setLoading(true);
  };

  // const getUser = async () => {
  //   try {
  //     const data = await axios
  //       .get("http://localhost:3000/user/loggedInUser", {
  //         headers: {
  //           Authorization: token,
  //         },
  //       })
  //       .then((res) => {
  //         setUser(res.data.user);
  //       });
  //     setLoading(true);
  //     return data;
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

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
