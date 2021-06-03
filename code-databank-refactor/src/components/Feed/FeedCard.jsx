import React, { useContext, useState } from "react";
import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router,
  withRouter,
} from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CreateReply from "../Replies/CreateReply";
import EditPost from "../Posts/EditPost";
import ViewPost from "./ViewPost";
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
import "./FeedCard-Styles.css";

import {
  GetPostsContext,
  PostsContext,
  CreateReplyContext,
  ReplyActiveContext,
  PostActiveContext,
  AddReplyContext,
  ReplyOnContext,
  ReplyOffContext,
} from "./FeedIndex";

import { TokenContext } from "../../App";
import { PostContext } from "./FeedDisplay";
export const SinglePostContext = React.createContext();

const { Panel } = Collapse;

const FeedCard = (props) => {
  // contexts
  const post = useContext(PostContext);
  const token = useContext(TokenContext);
  const getPosts = useContext(GetPostsContext);
  const createReply = useContext(CreateReplyContext);
  const replyActive = useContext(ReplyActiveContext);
  const postActive = useContext(PostActiveContext);
  const addReply = useContext(AddReplyContext);
  const replyOn = useContext(ReplyOnContext);
  const replyOff = useContext(ReplyOffContext);

  // state
  const [upvoteCount, setUpvoteCount] = useState();
  const [upvotePostCount, setUpvotePostCount] = useState();
  const [unSaved, setUnSaved] = useState(false);
  const [singlePost, setSinglePost] = useState({});
  const [editPostActive, setEditPostActive] = useState(false);
  const [editPost, setEditPost] = useState({});

  const editPostOn = () => {
    setEditPostActive(true);
  };

  const editPostOff = () => {
    setEditPostActive(false);
  };

  const updatePost = (post) => {
    setEditPost(post);
  };

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
        <a onClick={() => openSavedPostNotifiction()}>
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
        <h5>Edit</h5>
        <h5>
          <a id="delete-reply" onClick={() => deleteReply(reply)}>
            Delete
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
    <a onClick={() => openUnSavedPostNotifiction()}>
      <i key={unSaved} className="fas fa-bookmark"></i>
    </a>
  ) : (
    <a onClick={() => openSavedPostNotifiction()}>
      <i key={unSaved} className="far fa-bookmark"></i>
    </a>
  );

  const toggleIcon = () => {
    setUnSaved(!unSaved);
  };

  const openDeleteNotification = (post) => {
    const args = {
      message: "Success!",
      description: "Your post has been deleted!",
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
        setUpvoteCount(newUpvotes);
        getPosts();
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
        getPosts();
        return data;
      });
  };

  const deleteReply = (reply) => {
    fetch(`http://localhost:3000/replies/${reply.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getPosts();
        return data;
      });
  };

  const viewPostReplies = (post) => {
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSinglePost(data);
      });
  };

  const savePostInLocalStorage = (post) => {
    localStorage.setItem("post", JSON.stringify(post));
  };

  return (
    <SinglePostContext.Provider value={singlePost}>
      <div key={post?.id}>
        <Badge.Ribbon
          text={post?.upVotes === null || 0 ? 0 : post?.upVotes}
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
            // style={{ width: 575 }}
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
              {/* <p>{post?.postMessage}</p> */}
              {post?.postMessage.split("\n").map((message) => (
                <p>{message}</p>
              ))}
            </div>

            <div className="postedBy">
              <h5>Posted by: {post?.posterName}</h5>
            </div>
            {post?.replies
              .sort((a, b) => {
                return b.upVotes - a.upVotes;
              })
              .slice(0, 4)
              .map((reply, index) => (
                <div key={index} className="reply-container" key={reply.id}>
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
                      token={token}
                      createReply={createReply}
                      replyOff={replyOff}
                    />
                  ) : (
                    <></>
                  )}
                </Panel>
              </Collapse>
            </div>
          </Card>
        </Badge.Ribbon>
        {props.children}
        {editPostActive ? (
          <EditPost post={post} editPost={editPost} editPostOff={editPostOff} />
        ) : (
          <></>
        )}
      </div>
    </SinglePostContext.Provider>
  );
};

export default withRouter(FeedCard);
