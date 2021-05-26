import React, { useContext } from "react";
import DashboardIndex from "../Dashboard/DashboardIndex";
import EmotionIndex from "../EmotionResponse/EmotionIndex";
import { Row, Col } from "antd";
import { PostsContext } from "./FeedIndex";
export const PostContext = React.createContext();

const FeedDisplay = (props) => {
  const posts = useContext(PostsContext);

  return (
    <div>
      <Row justify="end" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
          {posts
            ?.sort((a, b) => {
              return b.id - a.id;
            })
            .map((post) => (
              <div key={post.id}>
                <PostContext.Provider value={post}>
                  {props.children}
                </PostContext.Provider>
              </div>
            ))}
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={6} xxl={6}>
          <DashboardIndex />
          <EmotionIndex />
        </Col>
      </Row>
    </div>
  );
};

export default FeedDisplay;
