import React, { useContext } from "react";
import DashboardIndex from "../Dashboard/DashboardIndex";
import EmotionIndex from "../EmotionResponse/EmotionIndex";
import { Row, Col, Button } from "antd";
import CreatePost from "../Posts/CreatePost";
import { TokenContext } from "../../App";
import { PostsContext, PostActiveContext, PostOnContext } from "./FeedIndex";
export const PostContext = React.createContext();

const FeedDisplay = (props) => {
  const token = useContext(TokenContext);
  const posts = useContext(PostsContext);
  const postActive = useContext(PostActiveContext);
  const postOn = useContext(PostOnContext);

  return (
    <div>
      <Row justify="center">
        <Col span={1}>
          <Button type="default" onClick={() => postOn()}>
            Create a post
          </Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={6}></Col>
        <Col span={12}>
          {posts
            ?.sort((a, b) => {
              return b.id - a.id;
            })
            .map((post) => (
              <div key={post.id}>
                <PostContext.Provider value={post}>
                  {/* <Col span={12}> */}
                  {props.children}
                  {/* </Col> */}
                </PostContext.Provider>
              </div>
            ))}
        </Col>
        {postActive ? <CreatePost /> : <></>}
        <Col span={6}>
          <DashboardIndex />
          <EmotionIndex />
        </Col>
      </Row>
    </div>
  );
};

export default FeedDisplay;
