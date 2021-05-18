import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import GetPosts from "../Fetches/GetPosts";
import FeedDisplay from "./FeedDisplay";
import CreatePost from "../Fetches/CreatePost";

const Feed = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [createReply, setCreateReply] = useState({});
  const [replyActive, setReplyActive] = useState(false);

  useEffect(() => {
    GetPosts(setPosts, token);
  }, []);

  const addReply = (reply) => {
    setCreateReply(reply);
  };

  const replyOn = () => {
    setReplyActive(true);
  };

  const replyOff = () => {
    setReplyActive(false);
  };

  return (
    <div>
      {/* <CreatePost token={token} /> */}
      <FeedDisplay
        token={token}
        posts={posts}
        setPosts={setPosts}
        addReply={addReply}
        createReply={createReply}
        replyOn={replyOn}
        replyOff={replyOff}
      />
    </div>
  );
};

export default Feed;
