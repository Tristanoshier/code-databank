import React from "react";
import DashboardIndex from "../Dashboard/DashboardIndex";
import EmotionIndex from "../EmotionResponse/EmotionIndex";
import { Row, Col } from "antd";
import FeedCard from "./FeedCard";

const FeedDisplay = (props) => {
  return (
    <div>
      <Row justify="end" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
          {props.posts
            ?.sort((a, b) => {
              return b.id - a.id;
            }).map((post, index) => (
              <div key={index}>
                <FeedCard 
                  post={post}
                  replyOn={props.replyOn}
                  replyOff={props.replyOff}
                  addReply={props.addReply}
                  createReply={props.createReply}
                  replyActive={props.replyActive}
                />
              </div>
            ))}
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={6} xxl={6}>
          <DashboardIndex 
            postActive={props.postActive} 
            postOn={props.postOn}
            postOff={props.postOff}
            getPosts={props.getPosts}
          />
          <EmotionIndex />
        </Col>
      </Row>
    </div>
  );
};

export default FeedDisplay;
