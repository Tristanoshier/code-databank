import React from "react";
import DashboardIndex from "../Dashboard/DashboardIndex";
import EmotionIndex from "../EmotionResponse/EmotionIndex";
import { Row, Col, Skeleton, Card, Tabs } from "antd";
import FeedCard from "./FeedCard";
import GettingStarted from "./GettingStarted";
import useViewport from "../../../../Shared/Hooks/useViewport";

const { TabPane } = Tabs;

const FeedDisplay = (props) => {
  const { width } = useViewport();
  const breakpoint = 768;

  const mobileHidden = () => {
    return (
      <div>
        {!props.isPopularPage ? (
          <Row justify="end" gutter={[16, 16]}>
            <>
              <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
                {props.loading ? (
                  <Card>
                    <Skeleton active paragraph={{ rows: 12 }} />
                  </Card>
                ) : (
                  props.posts
                    ?.filter((v, i, a) => a.indexOf(v) == i)
                    .map((post, index) =>
                      props.posts.length === index + 1 &&
                      props.lastPostOnScreen !== null ? (
                        <div ref={props.lastPostOnScreen} key={post.id}>
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
                        <div key={post.id}>
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
              <Col xs={24} sm={24} md={8} lg={8} xl={6} xxl={6}>
                <div>
                  <DashboardIndex
                    postActive={props.postActive}
                    postOn={props.postOn}
                    postOff={props.postOff}
                    getPosts={props.getPosts}
                    posts={props.posts}
                  />
                </div>
                <EmotionIndex />
              </Col>
            </>
          </Row>
        ) : (
          <Row justify="center">
            <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
              {props.loading ? (
                <Card>
                  <Skeleton active paragraph={{ rows: 12 }} />
                </Card>
              ) : (
                props.posts
                  ?.filter((v, i, a) => a.indexOf(v) == i)
                  .map((post, index) =>
                    props.posts.length === index + 1 &&
                    props.lastPostOnScreen !== null ? (
                      <div ref={props.lastPostOnScreen} key={post.id}>
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
                      <div key={post.id}>
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
          </Row>
        )}
      </div>
    );
  };

  const mobileVisible = () => {
    return (
      <div>
        {!props.isPopularPage ? (
          <Row justify="end" gutter={[16, 16]}>
            <>
              <Col xs={24} sm={24} md={8} lg={8} xl={6} xxl={6}>
                <Tabs
                  defaultActiveKey="1"
                  type="card"
                  size="small"
                  tabPosition="top"
                  animated={true}
                >
                  <TabPane tab="Dashboard" key="1">
                    <DashboardIndex
                      postActive={props.postActive}
                      postOn={props.postOn}
                      postOff={props.postOff}
                      getPosts={props.getPosts}
                      posts={props.posts}
                    />
                  </TabPane>
                  <TabPane tab="Emotional Response" key="2">
                    <EmotionIndex />
                  </TabPane>
                </Tabs>
              </Col>
              <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
                {props.loading ? (
                  <Card>
                    <Skeleton active paragraph={{ rows: 12 }} />
                  </Card>
                ) : (
                  props.posts
                    ?.filter((v, i, a) => a.indexOf(v) == i)
                    .map((post, index) =>
                      props.posts.length === index + 1 &&
                      props.lastPostOnScreen !== null ? (
                        <div ref={props.lastPostOnScreen} key={post.id}>
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
                        <div key={post.id}>
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
            </>
          </Row>
        ) : (
          <Row justify="center">
            <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
              {props.loading ? (
                <Card>
                  <Skeleton active paragraph={{ rows: 12 }} />
                </Card>
              ) : (
                props.posts
                  ?.filter((v, i, a) => a.indexOf(v) == i)
                  .map((post, index) =>
                    props.posts.length === index + 1 &&
                    props.lastPostOnScreen !== null ? (
                      <div ref={props.lastPostOnScreen} key={post.id}>
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
                      <div key={post.id}>
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
          </Row>
        )}
      </div>
    );
  };

  return <div>{width < breakpoint ? mobileVisible() : mobileHidden()}</div>;
};

export default FeedDisplay;
