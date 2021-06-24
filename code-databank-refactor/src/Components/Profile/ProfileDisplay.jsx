import React from "react";
import ProfileCard from "./ProfileCard";
import { Row, Col, Card, Tabs } from "antd";
import ProfileOverview from "./ProfileOverview";

const { TabPane } = Tabs;

const ProfileDisplay = (props) => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        size="small"
        tabPosition="top"
        animated={true}
        centered={true}
      >
        <TabPane tab="Overview" key="1">
          <Row justify="center">
            <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
              <ProfileOverview />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Saved Posts" key="2">
          <Row justify="center" gutter={[16, 16]}>
            {props.posts?.length === 0 ? (
              <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
                <Card className="feed-card" title="Such empty">
                  <p>
                    Looks like you don't have any posts saved, when you bookmark
                    a post you'll be able to view it here.
                  </p>
                </Card>
              </Col>
            ) : (
              props.posts?.map((post) => (
                <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
                  <div key={post.id}>
                    <ProfileCard post={post} getPosts={props.getPosts} />
                  </div>
                </Col>
              ))
            )}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfileDisplay;
