import React from "react";
import { Card, Divider, Badge, Collapse, Menu, Button, Row, Col } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import SyntaxHighlighter from "react-syntax-highlighter";
import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import mobileShield from "../Site/assets/mobile-shield.png";

const GettingStarted = () => {
  const { Panel } = Collapse;

  const controlButtons = () => {
    <>
      <Menu.Item>
        <EditOutlined />
        Edit Post
      </Menu.Item>
      <Menu.Item danger>
        <DeleteOutlined />
        Delete Post
      </Menu.Item>
    </>;
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <i className="far fa-bookmark"></i>
        Save Post
      </Menu.Item>
      {controlButtons()}
    </Menu>
  );

  const replyControlButtons = () => {
    <div className="reply-footer-actions">
      <h5>Edit</h5>
      <h5>Delete</h5>
    </div>;
  };

  return (
    <div>
      <Card
        className="feed-card"
        title={[
          <img
            src={mobileShield}
            S
            alt="mobile-shield"
            height="60px"
            style={{ paddingRight: "20px" }}
          />,
          `Welcome to Eleven Fifty Code-Databank`,
        ]}
      >
        <p>So far, there's nothing to see!</p>
        <p>
          Help other Learning Assistants by creating a post. You can create a
          post by clicking "Create a Post" underneath your Dashboard to the
          right.
        </p>
        <Divider orientation="left">Helpful Posts</Divider>
        {/* <h3>Helpful Posts</h3> */}
        <ul>
          <li>Error you're encountering</li>
          <li>A solution to a problem/error you had</li>
          <li>Any coding question</li>
        </ul>
      </Card>
      <Divider>Example Post</Divider>
      <div>
        <Badge.Ribbon
          text="8"
          color="#f50"
          placement="start"
          style={{ fontWeight: "400" }}
        >
          <Card
            className="feed-card"
            title={[
              <div className="card-header">
                <div className="card-header-arrow-container">
                  <div className="arrow-container">
                    <div className="arrow">
                      <ArrowUpOutlined className="arrow-up" />
                    </div>
                  </div>

                  <div className="arrow">
                    <ArrowDownOutlined className="arrow-down" />
                  </div>
                </div>

                <div className="container-sub">
                  <i className="fab fa-react"></i>JavaScript
                </div>
              </div>,
            ]}
            extra={[
              <>
                <Button type="link">
                  <i className="far fa-bookmark"></i>
                </Button>
              </>,
            ]}
          >
            <div className="postTitle-container">
              <h4 id="postTitle">My Title!</h4>
            </div>
            <hr id="postTitle-hr" />

            <h4>Question</h4>
            <div className="post-container">
              <p>This is an example post, type whatever you want in here!</p>
            </div>

            <div className="postedBy">
              <h5>Posted by: Code-Databank Helper</h5>
            </div>

            <div className="reply-container">
              <Row justify="center" align="start">
                <Col span={2}>
                  <div>
                    <ArrowUpOutlined />
                  </div>
                  <div>
                    <ArrowDownOutlined />
                  </div>
                </Col>
                <Col span={22}>
                  <Badge.Ribbon
                    text="10"
                    color="#f50"
                    placement="start"
                    style={{ fontWeight: "400" }}
                  >
                    <div className="reply-message-container">
                      <p id="reply-message">
                        Hey, I've replied to your message! Here's some sample
                        code if you need to add code.
                      </p>

                      <div className="code-container">
                        <SyntaxHighlighter
                          lineProps={{
                            style: {
                              // wordBreak: "break-all",
                              // whiteSpace: "pre-line",
                              whiteSpace: "pre-wrap",
                            },
                          }}
                          customStyle={{
                            paddingLeft: "2em",
                            borderRadius: "5px",
                          }}
                          useInlineStyles={true}
                          wrapLines={true}
                          language="Javascript"
                          style={rainbow}
                        >
                          loggedIn ? "Welcome!" : "Log in!"
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </Badge.Ribbon>
                  <div className="reply-footer">
                    <h5 id="replyName">Posted by: Code-Databank Helper</h5>
                    {replyControlButtons()}
                  </div>
                </Col>
              </Row>
            </div>
            <Divider />
            <div className="post-footer">
              <div className="view-replies-container">
                <i className="fas fa-comment-alt"></i>

                <h5 id="view-replies">View Replies (1)</h5>
              </div>
              <h5>Placeholder</h5>
              <h5>Placeholder</h5>
            </div>
            <div className="add-reply-container">
              <Collapse ghost>
                <Panel
                  showArrow={false}
                  key="1"
                  extra={<Button type="ghost">Add Reply</Button>}
                ></Panel>
              </Collapse>
            </div>
          </Card>
        </Badge.Ribbon>
      </div>
    </div>
  );
};
export default GettingStarted;
