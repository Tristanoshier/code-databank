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
  userId,
  replyActive,
}) => {
  return (
    <div>
      <Row justify="center">
        <Col span={11}>
          <CreatePost token={token} getPosts={getPosts} />
        </Col>
      </Row>
      {posts
        ?.sort((a, b) => {
          return b.id - a.id;
        })
        .map((post, index) => (
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
                userId={userId}
                replyActive={replyActive}
              />
            </Col>
          </Row>
        ))}
    </div>
  );
};

export default FeedDisplay;
