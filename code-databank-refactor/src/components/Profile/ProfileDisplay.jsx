import React from "react";
import ProfileCard from "./ProfileCard";
import { Row, Col } from "antd";

const ProfileDisplay = (props) => {
  return (
    <div>
      <Row justify="space-between">
        {props.posts?.map((post) => (
          <Col span={8}>
            <ProfileCard post={post} getPosts={props.getPosts} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProfileDisplay;
