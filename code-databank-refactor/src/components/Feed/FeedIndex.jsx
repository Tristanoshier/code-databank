import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedDisplay from "./FeedDisplay";

const FeedIndex = ({ token, userId }) => {
  const [posts, setPosts] = useState([]);
  const [createReply, setCreateReply] = useState({});
  const [replyActive, setReplyActive] = useState(false);
  const [postActive, setPostActive] = useState(false);
  const [createPost, setCreatePost] = useState({});

  // main GET fetch
  const getPosts = async () => {
    try {
      const data = await axios
        .get("http://localhost:3000/posts", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setPosts(res.data);
          console.log(res.data);
        });
      return data;
    } catch (error) {
      console.log("error", error);
    }
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

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <FeedDisplay
      token={token}
      posts={posts}
      addReply={addReply}
      createReply={createReply}
      replyOn={replyOn}
      replyOff={replyOff}
      getPosts={getPosts}
      userId={userId}
      replyActive={replyActive}
      postOn={postOn}
      postOff={postOff}
      postActive={postActive}
    />
  );
};

export default FeedIndex;
