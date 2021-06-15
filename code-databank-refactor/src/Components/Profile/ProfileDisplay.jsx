import React from "react";
import ProfileCard from "./ProfileCard";
import { Row, Col } from "antd";

const ProfileDisplay = (props) => {
  return (
    <div>
      <Row justify="space-between" gutter={[16, 16]}>
        {props.posts?.map((post) => (
          <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
            <ProfileCard post={post} getPosts={props.getPosts} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProfileDisplay;
