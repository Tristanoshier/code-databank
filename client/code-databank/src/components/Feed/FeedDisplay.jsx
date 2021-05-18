import React from "react";
import FeedCard from "./FeedCard";
import { Row, Col } from "antd";

const FeedDisplay = ({
  token,
  posts,
  setPosts,
  addReply,
  createReply,
  replyOn,
  replyOff,
}) => {
  return (
    <div>
      {posts?.map((post, index) => (
        <Row justify="center">
          <Col span={13}>
            <FeedCard
              post={post}
              index={index}
              token={token}
              key={index}
              setPosts={setPosts}
              addReply={addReply}
              createReply={createReply}
              replyOn={replyOn}
              replyOff={replyOff}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default FeedDisplay;
