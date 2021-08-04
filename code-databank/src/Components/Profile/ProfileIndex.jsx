import React, { useState, useEffect, useContext } from "react";
import { TokenContext } from "../../App";
import ProfileDisplay from "./ProfileDisplay";
import APIURL from "../../helpers/environment";

const ProfileIndex = (props) => {
  const [posts, setPosts] = useState([]);

  const token = useContext(TokenContext);

  const getPosts = () => {
    fetch(`${APIURL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);
  return <ProfileDisplay posts={posts} getPosts={getPosts} />;
};

export default ProfileIndex;
