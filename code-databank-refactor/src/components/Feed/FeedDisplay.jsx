import React from "react";
import FeedCard from "./FeedCard";
import { Row, Col, Button } from "antd";
import CreatePost from "../Posts/CreatePost";
import DashboardIndex from "../Dashboard/DashboardIndex";

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
  postOn,
  postOff,
  postActive,
}) => {
  return (
    <div>
      <Row justify="center">
        <Col span={1}>
          {/* <CreatePost token={token} getPosts={getPosts} /> */}
          <Button type="default" onClick={() => postOn()}>
            Create a post
          </Button>
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
      {postActive ? (
        <CreatePost token={token} getPosts={getPosts} postOff={postOff} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default FeedDisplay;
