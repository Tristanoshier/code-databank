import React, { useState, useContext } from "react";
import { withRouter, useHistory } from "react-router-dom";
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
  notification,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CreateReply from "../../../../Shared/Replies/CreateReply";
import { TokenContext } from "../../../../../App";
import "./FeedCard-Styles.css";

const { Panel } = Collapse;

const FocusedPost = (props) => {
  const [upvoteCount, setUpvoteCount] = useState();
  const [upvotePostCount, setUpvotePostCount] = useState();
  const [createReply, setCreateReply] = useState({});
  const [replyActive, setReplyActive] = useState(false);
  const [unSaved, setUnSaved] = useState(false);

  const post = props.location.post;
  const token = useContext(TokenContext);

  const controlButtons = () => {
    return localStorage.getItem("id") != post?.ownerId ? (
      ""
    ) : (
      <>
        <Menu.Item>
          <EditOutlined />
          Edit Post
        </Menu.Item>
        <Menu.Item danger>
          <a onClick={() => DeletePost(post)}>
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

  const iconType = (post) => {
    if (post?.codeType === "React") {
      return <i className="fab fa-react"></i>;
    } else if (post?.codeType === "JavaScript") {
      return <i className="fab fa-js-square"></i>;
    } else if (post?.codeType === "HTML") {
      return <i className="fab fa-html5"></i>;
    } else if (post?.codeType === "CSS") {
      return <i className="fab fa-css3-alt"></i>;
    } else if (post?.codeType === "Github") {
      return <i className="fab fa-github"></i>;
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

  const replyControlButtons = (reply) => {
    return localStorage.getItem("id") != reply?.ownerId ? (
      ""
    ) : (
      <div className="reply-footer-actions">
        <h5>Edit</h5>
        <h5>
          <a id="delete-reply" onClick={() => deleteReply(reply)}>
            Delete
          </a>
        </h5>
      </div>
    );
  };

  const addReply = (reply) => {
    setCreateReply(reply);
  };

  const replyOn = () => {
    setReplyActive(true);
  };

  const replyOff = () => {
    setReplyActive(!replyActive);
  };

  const openDeleteNotification = (post) => {
    const args = {
      message: "Success!",
      description: "Your post has been deleted!",
      duration: 2,
    };
    notification.open(args);
  };

  const getSpecificPost = (post) => {
    fetch(`${post.id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log(data);
      });
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
      .then(() => {
        setUpvotePostCount(newUpvotes);
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
      .then(() => {
        setUpvotePostCount(newUpvotes);
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
      .then(() => {
        setUpvoteCount(newUpvotes);
      });
  };

  const DeletePost = (post) => {
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        openDeleteNotification(post);
        return data;
      });
  };

  const displayPost = () => {
    let storedPost = JSON.parse(localStorage.getItem("post"));
    let focusedPost = post === undefined ? storedPost : post;

    return (
      <div>
        <Badge.Ribbon
          text={focusedPost?.upVotes === null || 0 ? 0 : focusedPost?.upVotes}
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
                          upVotePost(focusedPost);
                        }}
                      />
                    </div>
                  </div>

                  <div className="arrow">
                    <ArrowDownOutlined
                      className="arrow-down"
                      onClick={() => downVotePost(focusedPost)}
                    />
                  </div>
                </div>

                <div className="container-sub">
                  {iconType(focusedPost)}
                  {focusedPost?.codeType}
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
            <div className="postTitle-container">
              <h4 id="postTitle">{focusedPost?.postTitle}</h4>
            </div>
            <hr id="postTitle-hr" />

            <h4>{focusedPost?.postType}</h4>
            <div className="post-container">
              <p>{focusedPost?.postMessage}</p>
            </div>

            <div className="postedBy">
              <h5>Posted by: {focusedPost?.posterName}</h5>
            </div>
            {focusedPost?.replies
              .sort((a, b) => {
                return b.upVotes - a.upVotes;
              })
              .map((reply) => (
                <div key={reply.id} className="reply-container">
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
                      <Badge.Ribbon
                        text={reply?.upVotes === null || 0 ? 0 : reply?.upVotes}
                        color="#f50"
                        placement="start"
                      >
                        <div className="reply-message-container">
                          <p id="reply-message">{reply?.replyMessage}</p>
                          {reply.replyCode != "" || null ? (
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
                                key={reply.id}
                                language={post?.codeType}
                                language="Javascript"
                                style={rainbow}
                              >
                                {reply?.replyCode}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Badge.Ribbon>
                      <div className="reply-footer">
                        <h5 id="replyName">Posted by: {reply?.replyName}</h5>
                        {replyControlButtons(reply)}
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            <Divider />
            <Collapse ghost>
              <Panel
                showArrow={false}
                key="1"
                extra={
                  <Button
                    type="ghost"
                    onClick={() => {
                      replyOn();
                      addReply(focusedPost);
                    }}
                  >
                    Add Reply
                  </Button>
                }
              >
                {replyActive ? (
                  <CreateReply
                    token={token}
                    createReply={createReply}
                    replyOff={replyOff}
                  />
                ) : (
                  <></>
                )}
              </Panel>
            </Collapse>
          </Card>
        </Badge.Ribbon>
      </div>
    );
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
        {/* <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}> */}
        {displayPost()}
      </Col>
    </Row>
  );
};

export default withRouter(FocusedPost);
