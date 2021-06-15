import React from "react";
import DashboardIndex from "../Dashboard/DashboardIndex";
import EmotionIndex from "../EmotionResponse/EmotionIndex";
import { Row, Col, Spin } from "antd";
import FeedCard from "./FeedCard";
import GettingStarted from "./GettingStarted";

const FeedDisplay = (props) => {
  return (
    <div>
      <Row justify="end" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
          {/* original: props.posts.length === 0 */}
          {props.loading ? (
            // <GettingStarted />
            <Spin />
          ) : (
            props.posts?.map((post, index) =>
              props.posts.length === index + 1 &&
              props.lastPostOnScreen !== null ? (
                <div ref={props.lastPostOnScreen} key={index}>
                  <FeedCard
                    post={post}
                    replyOn={props.replyOn}
                    replyOff={props.replyOff}
                    addReply={props.addReply}
                    createReply={props.createReply}
                    replyActive={props.replyActive}
                    getPosts={props.getPosts}
                  />
                </div>
              ) : (
                <div key={index}>
                  <FeedCard
                    post={post}
                    replyOn={props.replyOn}
                    replyOff={props.replyOff}
                    addReply={props.addReply}
                    createReply={props.createReply}
                    replyActive={props.replyActive}
                    getPosts={props.getPosts}
                  />
                </div>
              )
            )
          )}
        </Col>
        {!props.isPopularPage ? (
          <Col xs={24} sm={24} md={8} lg={8} xl={6} xxl={6}>
            <DashboardIndex
              postActive={props.postActive}
              postOn={props.postOn}
              postOff={props.postOff}
              getPosts={props.getPosts}
              posts={props.posts}
            />
            <EmotionIndex />
          </Col>
        ) : (
          <Col xs={24} sm={24} md={8} lg={8} xl={6} xxl={6}></Col>
        )}
      </Row>
    </div>
  );
};

export default FeedDisplay;
