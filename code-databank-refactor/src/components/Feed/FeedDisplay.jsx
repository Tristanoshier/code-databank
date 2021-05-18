import React from "react";
import FeedCard from "./FeedCard";
import { Row, Col } from "antd";
import CreatePost from "../Posts/CreatePost";

const FeedDisplay = ({
  token,
  posts,
  addReply,
  createReply,
  replyOn,
  replyOff,
  getPosts,
  firstName,
}) => {
  return (
    <div>
      <Row justify="center">
        <Col span={11}>
          <CreatePost token={token} getPosts={getPosts} />
        </Col>
      </Row>
      {posts?.map((post, index) => (
        <Row justify="center">
          <Col span={13}>
            <FeedCard
              post={post}
              index={index}
              token={token}
              key={index}
              addReply={addReply}
              createReply={createReply}
              replyOn={replyOn}
              replyOff={replyOff}
              getPosts={getPosts}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default FeedDisplay;
