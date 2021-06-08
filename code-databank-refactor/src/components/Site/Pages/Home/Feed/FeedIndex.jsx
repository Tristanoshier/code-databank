import React, { useState, useEffect, useContext } from "react";
import { Spin } from "antd";
import axios from "axios";
import { TokenContext } from "../../../../../App";
import FeedDisplay from "./FeedDisplay";

const FeedIndex = () => {
  const token = useContext(TokenContext);

  const [posts, setPosts] = useState([]);
  const [createReply, setCreateReply] = useState({});
  const [replyActive, setReplyActive] = useState(false);
  const [postActive, setPostActive] = useState(false);
  const [createPost, setCreatePost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    try {
      const data = axios
        .get("http://localhost:3000/posts", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setPosts(res.data);
        });
      return data;
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  // post actives
  const addPost = (post) => {
    setCreatePost(post);
  };

  const postOn = () => {
    setPostActive(true);
  };

  const postOff = () => {
    setPostActive(false);
  };

  // reply actives
  const addReply = (reply) => {
    setCreateReply(reply);
  };

  const replyOn = () => {
    setReplyActive(true);
  };

  const replyOff = () => {
    setReplyActive(!replyActive);
  };

  return (
    <div>
      {loading ? (
        <FeedDisplay
          posts={posts}
          replyActive={replyActive}
          postActive={postActive}
          addPost={addPost}
          postOn={postOn}
          postOff={postOff}
          createReply={createReply}
          addReply={addReply}
          replyOn={replyOn}
          replyOff={replyOff}
          getPosts={getPosts}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default FeedIndex;
