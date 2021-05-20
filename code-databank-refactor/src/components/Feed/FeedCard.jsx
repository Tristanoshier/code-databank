import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  Row,
  Col,
  Card,
  Collapse,
  Badge,
  Divider,
  Button,
  Menu,
  Dropdown,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CreateReply from "../Replies/CreateReply";
import DeletePost from "../Fetches/DeletePost";
import "./FeedCard-Styles.css";

const { Panel } = Collapse;

const FeedCard = ({
  token,
  post,
  index,
  replyOn,
  replyOff,
  addReply,
  createReply,
  getPosts,
  userId,
}) => {
  const [upvoteCount, setUpvoteCount] = useState();
  const [upvotePostCount, setUpvotePostCount] = useState();
  const [unSaved, setUnSaved] = useState(false);

  const controlButtons = () => {
    return localStorage.getItem("id") != post.ownerId ? (
      ""
    ) : (
      <>
        <Menu.Item>
          <EditOutlined />
          Edit Post
        </Menu.Item>
        <Menu.Item danger>
          <a onClick={() => DeletePost(post, token)}>
            <DeleteOutlined />
            Delete Post
          </a>
        </Menu.Item>
      </>
    );
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

  const cardDropdown = () => {
    return (
      <Dropdown overlay={menu}>
        <Button
          className="settings-button"
          type="default"
          onClick={(e) => e.preventDefault()}
        >
          <EllipsisOutlined key="ellipsis" />
        </Button>
      </Dropdown>
    );
  };

  const iconType = () => {
    if (post.codeType === "React") {
      return <i className="fab fa-react"></i>;
    } else if (post.codeType === "JavaScript") {
      return <i className="fab fa-js-square"></i>;
    } else if (post.codeType === "HTML") {
      return <i className="fab fa-html5"></i>;
    } else if (post.codeType === "CSS") {
      return <i className="fab fa-css3-alt"></i>;
    } else if (post.codeType === "Github") {
      return <i class="fab fa-github"></i>;
    } else {
      return <i className="far fa-question-circle"></i>;
    }
  };

  const icon = unSaved ? (
    <i key={unSaved} className="fas fa-bookmark"></i>
  ) : (
    <i key={unSaved} className="far fa-bookmark"></i>
  );

  const toggleIcon = () => {
    setUnSaved(!unSaved);
  };

  const upVoteReply = (reply) => {
    let newUpvotes = reply.upVotes + 1;
    fetch(`http://localhost:3000/replies/${reply.id}`, {
      method: "PUT",
      body: JSON.stringify({
        replyMessage: reply.replyMessage,
        upVotes: newUpvotes,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpvoteCount(newUpvotes);
        getPosts();
      });
  };

  const upVotePost = (post) => {
    let newUpvotes = post.upVotes + 1;
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        upVotes: newUpvotes,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpvotePostCount(newUpvotes);
        getPosts();
      });
  };

  const downVotePost = (post) => {
    let newUpvotes = post.upVotes - 1;
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        upVotes: newUpvotes,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpvotePostCount(newUpvotes);
        getPosts();
      });
  };

  const downVoteReply = (reply) => {
    let newUpvotes = reply.upVotes - 1;
    fetch(`http://localhost:3000/replies/${reply.id}`, {
      method: "PUT",
      body: JSON.stringify({
        replyMessage: reply.replyMessage,
        upVotes: newUpvotes,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpvoteCount(newUpvotes);
        getPosts();
      });
  };

  const deletePost = (post) => {
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    }).then(() => getPosts());
  };

  return (
    <Row justif="center">
      <Col span={8}>
        <Badge.Ribbon
          text={post.upVotes === null || 0 ? 0 : post.upVotes}
          color="#f50"
          placement="start"
        >
          <Card
            className="feed-card"
            title={[
              <div className="card-header">
                <div className="card-header-arrow-container">
                  <div className="arrow-container">
                    <div className="arrow">
                      <ArrowUpOutlined
                        className="arrow-up"
                        onClick={() => {
                          upVotePost(post);
                        }}
                      />
                    </div>
                  </div>

                  <div className="arrow">
                    <ArrowDownOutlined
                      className="arrow-down"
                      onClick={() => downVotePost(post)}
                    />
                  </div>
                </div>

                <div className="container-sub">
                  {iconType()}
                  {post.codeType}
                </div>
              </div>,
            ]}
            style={{ width: 600 }}
            extra={[
              <>
                <Button type="link" onClick={toggleIcon}>
                  {icon}
                </Button>
              </>,
              cardDropdown(),
            ]}
          >
            <h4>{post.postTitle}</h4>
            <p>{post.postMessage}</p>
            <p>{post.postType}</p>
            <div className="postedBy">
              <h5>Posted by: {post.posterName}</h5>
            </div>
            {post?.replies
              .sort((a, b) => {
                return b.upVotes - a.upVotes;
              })
              .map((reply, index) => (
                <div>
                  <Row justify="center" align="start">
                    <Col span={2}>
                      <div>
                        <ArrowUpOutlined
                          onClick={() => {
                            upVoteReply(reply);
                          }}
                        />
                      </div>
                      <div>
                        <ArrowDownOutlined
                          onClick={() => downVoteReply(reply)}
                        />
                      </div>
                    </Col>
                    <Col span={22}>
                      {post.codeType === "Github" ? (
                        <Badge.Ribbon
                          text={reply.upVotes === null || 0 ? 0 : reply.upVotes}
                          color="#f50"
                          placement="start"
                        >
                          <div className="reply-container">
                            <p>{reply.replyMessage}</p>
                          </div>
                        </Badge.Ribbon>
                      ) : (
                        <div className="code-container">
                          <Badge.Ribbon
                            text={
                              reply.upVotes === null || 0 ? 0 : reply.upVotes
                            }
                            color="#f50"
                            placement="start"
                          >
                            <SyntaxHighlighter
                              lineProps={{
                                style: {
                                  // wordBreak: "break-all",
                                  whiteSpace: "pre-line",
                                  // whiteSpace: "pre-wrap"
                                },
                              }}
                              customStyle={{
                                paddingLeft: "2em",
                                borderRadius: "5px",
                              }}
                              useInlineStyles={true}
                              wrapLines={true}
                              key={reply.id}
                              language={post.codeType}
                              language="Javascript"
                              style={rainbow}
                            >
                              {reply.replyMessage}
                            </SyntaxHighlighter>
                          </Badge.Ribbon>
                        </div>
                      )}
                      <h5 id="replyName">Posted by: {reply.replyName}</h5>
                      <Divider />
                    </Col>
                  </Row>
                </div>
              ))}
            <Collapse ghost>
              <Panel
                showArrow={false}
                key="1"
                extra={
                  <Button
                    type="ghost"
                    onClick={() => {
                      replyOn();
                      addReply(post);
                      console.log(post.id);
                    }}
                  >
                    Add Reply
                  </Button>
                }
              >
                <CreateReply
                  token={token}
                  createReply={createReply}
                  replyOff={replyOff}
                  getPosts={getPosts}
                />
              </Panel>
            </Collapse>
          </Card>
        </Badge.Ribbon>
      </Col>
    </Row>
  );
};

export default FeedCard;
