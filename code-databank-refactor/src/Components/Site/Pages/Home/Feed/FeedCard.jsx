import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";

import CreateReply from "../../../../Shared/Replies/CreateReply";
import EditPost from "../../../../Shared/Posts/EditPost";
import EditReply from "../../../../Shared/Replies/EditReply";

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
  Popconfirm,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const { Panel } = Collapse;

import "./FeedCard-Styles.css";

import { TokenContext } from "../../../../../App";

const FeedCard = ({
  post,
  replyActive,
  replyOn,
  replyOff,
  addReply,
  createReply,
  getPosts,
}) => {
  const [upvoteCount, setUpvoteCount] = useState();
  const [upvotePostCount, setUpvotePostCount] = useState();
  const [unSaved, setUnSaved] = useState(false);
  const [editPostActive, setEditPostActive] = useState(false);
  const [editPost, setEditPost] = useState({});
  const [editReply, setEditReply] = useState({});
  const [editReplyActive, setEditReplyActive] = useState(false);

  const token = useContext(TokenContext);

  // edit post -------------------------------------------

  const editPostOn = () => {
    setEditPostActive(true);
  };

  const editPostOff = () => {
    setEditPostActive(false);
  };

  const updatePost = (post) => {
    setEditPost(post);
  };

  // edit reply -------------------------------------------

  const editReplyOn = () => {
    setEditReplyActive(true);
  };

  const editReplyOff = () => {
    setEditReplyActive(false);
  };

  const updateReply = (reply) => {
    setEditReply(reply);
  };

  // notifications -------------------------------------------

  const openDeletePostNotification = () => {
    const args = {
      message: "Success!",
      description: "Your post has been deleted!",
      duration: 1,
    };
    notification.open(args);
  };

  const openDeleteReplyNotification = () => {
    const args = {
      message: "Success!",
      description: "Your reply has been deleted!",
      duration: 1,
    };
    notification.open(args);
  };

  const openSavedPostNotifiction = () => {
    const args = {
      message: "Post Saved!",
      duration: 1,
    };
    notification.open(args);
  };

  const openUnSavedPostNotifiction = () => {
    const args = {
      message: "Post Unsaved!",
      duration: 1,
    };
    notification.open(args);
  };

  // service requests -------------------------------------------

  const upVotePost = (post) => {
    let newUpVotes = post?.upVotes + 1;
    try {
      fetch(`http://localhost:3000/posts/vote/${post.id}`, {
        method: "PUT",
        body: JSON.stringify({
          upVotes: newUpVotes,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setUpvotePostCount(newUpVotes);
          getPosts(false);
        });
    } catch {
      console.log("throw error");
    }
  };

  const downVotePost = (post) => {
    let newUpVotes = post.upVotes - 1;
    try {
      fetch(`http://localhost:3000/posts/vote/${post.id}`, {
        method: "PUT",
        body: JSON.stringify({
          upVotes: newUpVotes,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setUpvotePostCount(newUpVotes);
          getPosts(false);
        });
    } catch {
      console.log("throw error");
    }
  };

  const upVoteReply = (reply) => {
    let newUpVotes = reply.upVotes + 1;
    try {
      fetch(`http://localhost:3000/replies/vote/${reply.id}`, {
        method: "PUT",
        body: JSON.stringify({
          replyMessage: reply.replyMessage,
          upVotes: newUpVotes,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setUpvoteCount(newUpVotes);
          getPosts(false);
        });
    } catch {
      console.log("throw error");
    }
  };

  const downVoteReply = (reply) => {
    let newUpVotes = reply.upVotes - 1;
    try {
      fetch(`http://localhost:3000/replies/vote/${reply.id}`, {
        method: "PUT",
        body: JSON.stringify({
          replyMessage: reply.replyMessage,
          upVotes: newUpVotes,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setUpvoteCount(newUpVotes);
          getPosts(false);
        });
    } catch {
      console.log("throw error");
    }
  };

  const DeletePost = (post) => {
    try {
      fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          openDeletePostNotification();
          getPosts(false);
        });
    } catch {
      console.log("throw error");
    }
  };

  const deleteReply = (reply) => {
    try {
      fetch(`http://localhost:3000/replies/${reply.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          openDeleteReplyNotification();
          getPosts(false);
        });
    } catch {
      console.log("throw error");
    }
  };

  const savePostInLocalStorage = (post) => {
    localStorage.setItem("post", JSON.stringify(post));
  };

  const addToSaved = async (post) => {
    try {
      fetch("http://localhost:3000/profile", {
        method: "POST",
        body: JSON.stringify({
          postTitle: post.postTitle,
          postMessage: post.postMessage,
          postCode: post.postCode,
          postType: post.postType,
          codeType: post.codeType,
          upVotes: post.upVotes,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // styling functions ---------------------------------------------

  const controlButtons = () => {
    return localStorage.getItem("id") != post?.ownerId ? (
      ""
    ) : (
      <>
        <Menu.Item>
          <a
            onClick={() => {
              editPostOn();
              updatePost(post);
            }}
          >
            <EditOutlined />
            Edit Post
          </a>
        </Menu.Item>
        <Menu.Item danger>
          <Popconfirm
            title="Are you sure？"
            placement="topRight"
            okText="Yes"
            cancelText="No"
            onConfirm={() => DeletePost(post)}
          >
            <DeleteOutlined />
            Delete Post
          </Popconfirm>
        </Menu.Item>
      </>
    );
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          onClick={() => {
            addToSaved(post);
            openSavedPostNotifiction();
          }}
        >
          <i className="far fa-bookmark"></i>
          Save Post
        </a>
      </Menu.Item>
      {controlButtons()}
    </Menu>
  );

  const replyControlButtons = (reply) => {
    return localStorage.getItem("id") != reply?.ownerId ? (
      ""
    ) : (
      <div className="reply-footer-actions">
        <h5>
          <a
            id="edit-reply"
            onClick={() => {
              editReplyOn();
              updateReply(reply);
            }}
          >
            Edit
          </a>
        </h5>
        <h5>
          <a id="delete-reply">
            <Popconfirm
              title="Are you sure？"
              placement="topRight"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteReply(reply)}
            >
              Delete
            </Popconfirm>
          </a>
        </h5>
      </div>
    );
  };

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
    <a
      onClick={() => {
        openUnSavedPostNotifiction();
      }}
    >
      <i key={unSaved} className="fas fa-bookmark"></i>
    </a>
  ) : (
    <a
      onClick={() => {
        addToSaved(post);
        openSavedPostNotifiction();
      }}
    >
      <i key={unSaved} className="far fa-bookmark"></i>
    </a>
  );

  const toggleIcon = () => {
    setUnSaved(!unSaved);
  };

  return (
    <div>
      <div>
        <Badge.Ribbon
          className="badge"
          text={
            post?.upVotes === null || 0
              ? 0
              : post?.upVotes >= 999
              ? "1k+"
              : post?.upVotes
          }
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
                  {post?.codeType}
                </div>
              </div>,
            ]}
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
              <h4 id="postTitle">{post?.postTitle}</h4>
            </div>
            <hr id="postTitle-hr" />

            <h4>{post?.postType}</h4>
            <div className="post-container">
              {/* {post?.postMessage.split("\n").map((message) => (
                <p key={post.id}>{message}</p>
              ))} */}
              <p>{post?.postMessage}</p>
              {post.postCode !== "" && post?.postCode !== null ? (
                <div className="post-code">
                  <SyntaxHighlighter
                    lineProps={{
                      style: {
                        // wordBreak: "break-all",
                        // whiteSpace: "pre-line",
                        whiteSpace: "pre-wrap",
                      },
                    }}
                    customStyle={{
                      paddingLeft: "1em",
                      borderRadius: "5px",
                    }}
                    useInlineStyles={true}
                    wrapLines={true}
                    key={post.id}
                    language={post.codeType}
                    style={rainbow}
                  >
                    {post?.postCode}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="postedBy">
              <h5>Posted by: {post?.posterName}</h5>
            </div>
            {post?.replies
              .sort((a, b) => {
                return b.upVotes - a.upVotes;
              })
              .slice(0, 4)
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
                        className="badge"
                        text={reply?.upVotes === null || 0 ? 0 : reply?.upVotes}
                        color="#f50"
                        placement="start"
                      >
                        <div className="reply-message-container">
                          <p id="reply-message">{reply?.replyMessage}</p>
                          {reply?.replyCode !== "" &&
                          reply?.replyCode !== null ? (
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
                                  paddingLeft: "1em",
                                  // paddingRight: "1em",
                                  borderRadius: "5px",
                                  overflow: "hidden",
                                }}
                                useInlineStyles={true}
                                wrapLines={true}
                                key={reply.id}
                                language={post.codeType}
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

                  {editReplyActive ? (
                    <EditReply
                      editReply={editReply}
                      editReplyOff={editReplyOff}
                      reply={reply}
                      getPosts={getPosts}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            <Divider />
            <div className="post-footer">
              <div className="view-replies-container">
                <i className="fas fa-comment-alt"></i>
                <Link
                  onClick={() => savePostInLocalStorage(post)}
                  to={{
                    pathname: `/focusedPost/${post?.postTitle}`,
                    post: post,
                  }}
                >
                  <h5 id="view-replies">
                    View Replies ({post?.replies.length})
                  </h5>
                </Link>
              </div>
              <h5>Placeholder</h5>
              <h5>Placeholder</h5>
            </div>
            <div className="add-reply-container">
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
                      }}
                    >
                      Add Reply
                    </Button>
                  }
                >
                  {replyActive ? (
                    <CreateReply
                      createReply={createReply}
                      replyOff={replyOff}
                      getPosts={getPosts}
                    />
                  ) : (
                    <></>
                  )}
                </Panel>
              </Collapse>
            </div>
          </Card>
        </Badge.Ribbon>
      </div>
      {editPostActive ? (
        <EditPost
          editPost={editPost}
          editPostOff={editPostOff}
          post={post}
          getPosts={getPosts}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default withRouter(FeedCard);
