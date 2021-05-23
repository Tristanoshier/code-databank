import React, { useContext } from "react";
import FeedCard from "./FeedCard";
import { Row, Col, Button } from "antd";
import CreatePost from "../Posts/CreatePost";
import DashboardIndex from "../Dashboard/DashboardIndex";
import { TokenContext } from "../../App";
import { PostsContext, PostActiveContext, PostOnContext } from "./FeedIndex";
export const PostContext = React.createContext();

const FeedDisplay = () => {
  const token = useContext(TokenContext);
  const posts = useContext(PostsContext);
  const postActive = useContext(PostActiveContext);
  const postOn = useContext(PostOnContext);
  return (
    <TokenContext.Provider value={token}>
      <div>
        <Row justify="center">
          <Col span={1}>
            <Button type="default" onClick={() => postOn()}>
              Create a post
            </Button>
          </Col>
        </Row>
        {posts
          ?.sort((a, b) => {
            return b.id - a.id;
          })
          .map((post) => (
            <div key={post.id}>
              <PostContext.Provider value={post}>
                <Row justify="center">
                  <Col span={13}>
                    <FeedCard />
                  </Col>
                </Row>
              </PostContext.Provider>
            </div>
          ))}
        {postActive ? <CreatePost /> : <></>}
      </div>
    </TokenContext.Provider>
  );
};

export default FeedDisplay;
