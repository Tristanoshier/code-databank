import React, { useContext, useState, useEffect } from "react";
import { TokenContext } from "../../../../../App";
import "./Dashboard-Styles.css";
import DashboardDisplay from "./DashboardDisplay";

const DashboardIndex = ({ postActive, postOn, postOff, getPosts, posts }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isAuth, setIsAuth] = useState(false);
  const token = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const getUser = () => {
    fetch("https://cd-server.herokuapp.com/user/loggedInUser", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
        // setIsAuth(true);
      });
  };

  // const getUser = async () => {
  //   try {
  //     const data = await axios
  //       .get("https://cd-server.herokuapp.com/user/loggedInUser", {
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
        // isAuth={isAuth}
        // setIsAuth={setIsAuth}
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
