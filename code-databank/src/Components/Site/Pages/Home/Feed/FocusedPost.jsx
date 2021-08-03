import React, { useState, useContext, useEffect } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
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
  Popconfirm,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CreateReply from "../../../../Shared/Replies/CreateReply";
import EditPost from "../../../../Shared/Posts/EditPost";
import EditReply from "../../../../Shared/Replies/EditReply";
import { TokenContext } from "../../../../../App";
import "./FeedCard-Styles.css";
import CreatePost from "../../../../Shared/Posts/CreatePost";

const { Panel } = Collapse;

const FocusedPost = (props) => {
  const [upvoteCount, setUpvoteCount] = useState();
  const [upvotePostCount, setUpvotePostCount] = useState();
  const [createReply, setCreateReply] = useState({});
  const [editPostActive, setEditPostActive] = useState(false);
  const [replyActive, setReplyActive] = useState(false);
  const [unSaved, setUnSaved] = useState(false);

  const [post, setPost] = useState();
  const [focusedPostEdit, setFocusedPostEdit] = useState(true);
  const [focusedReplyEdit, setFocusedReplyEdit] = useState(true);
  const [focusedReply, setFocusedReply] = useState(true);
  const [editPost, setEditPost] = useState({});
  const [editReply, setEditReply] = useState({});
  const [editReplyActive, setEditReplyActive] = useState(false);
  const token = useContext(TokenContext);

  const history = useHistory();

  // const post = props.location.post;
  useEffect(() => {
    setPost(props.location.post);
  }, []);

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
            openSavedPostNotification();
          }}
        >
          <i className="far fa-bookmark"></i>
          Save Post
        </a>
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
    <a
      onClick={() => {
        openUnSavedPostNotification();
      }}
    >
      <i key={unSaved} className="fas fa-bookmark"></i>
    </a>
  ) : (
    <a
      onClick={() => {
        addToSaved(post);
        openSavedPostNotification();
      }}
    >
      <i key={unSaved} className="far fa-bookmark"></i>
    </a>
  );

  const toggleIcon = () => {
    setUnSaved(!unSaved);
  };

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

  const addReply = (reply) => {
    setCreateReply(reply);
  };

  const replyOn = () => {
    setReplyActive(true);
  };

  const replyOff = () => {
    setReplyActive(!replyActive);
  };

  // notifications -------------------------------------------

  const openDeleteNotification = (post) => {
    const args = {
      message: "Success!",
      description: "Your post has been deleted!",
      duration: 2,
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

  const openSavedPostNotification = () => {
    const authArgs = {
      message: "Post Saved!",
      duration: 1,
    };

    const args = {
      message: "Must be logged in to do that!",
      duration: 1,
    };
    token ? notification.open(authArgs) : notification.open(args);
  };

  const openUnSavedPostNotification = () => {
    const args = {
      message: "Post Unsaved!",
      duration: 1,
    };
    token && notification.open(args);
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
      .then((data) => {
        console.log(data);
      });
  };

  const getPost = (post) => {
    fetch(`https://cd-server.herokuapp.com/posts/${post.id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        post = data;
        localStorage.setItem("post", JSON.stringify(post));
        setPost(post);
      });
  };

  const upVoteReply = (reply) => {
    let newUpvotes = reply.upVotes + 1;
    fetch(`https://cd-server.herokuapp.com/replies/vote/${reply.id}`, {
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
        getPost(post);
      });
  };

  // async test
  const upVotePost = async (post) => {
    let newUpvotes = post.upVotes + 1;

    const settings = {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
      body: JSON.stringify({
        upVotes: newUpvotes,
      }),
    };
    try {
      const response = await fetch(
        `https://cd-server.herokuapp.com/posts/vote/${post.id}`,
        settings
      );
      const data = await response.json();
      setUpvotePostCount(newUpvotes);
      getPost(post);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // const upVotePost = (post) => {
  //   let newUpvotes = post.upVotes + 1;
  //   fetch(`https://cd-server.herokuapp.com/posts/vote/${post.id}`, {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       upVotes: newUpvotes,
  //     }),
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       setUpvotePostCount(newUpvotes);
  //       getPost(post);
  //     });
  // };

  const downVotePost = (post) => {
    let newUpvotes = post.upVotes - 1;
    fetch(`https://cd-server.herokuapp.com/posts/vote/${post.id}`, {
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
        getPost(post);
      });
  };

  const downVoteReply = (reply) => {
    let newUpvotes = reply.upVotes - 1;
    fetch(`https://cd-server.herokuapp.com/replies/vote/${reply.id}`, {
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
        getPost(post);
      });
  };

  const DeletePost = (post) => {
    fetch(`https://cd-server.herokuapp.com/posts/${post.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        openDeleteNotification(post);
        getPost(post);
        history.goBack();
        return data;
      });
  };

  const deleteReply = (reply) => {
    try {
      fetch(`https://cd-server.herokuapp.com/replies/${reply.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          openDeleteReplyNotification();
          getPost(post);
        });
    } catch {
      console.log("throw error");
    }
  };

  const addToSaved = async (post) => {
    try {
      token &&
        fetch("https://cd-server.herokuapp.com/profile", {
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

  const displayPost = () => {
    let storedPost = JSON.parse(localStorage.getItem("post"));
    let focusedPost = post === undefined ? storedPost : post;

    return (
      <div>
        <div>
          <Badge.Ribbon
            className="badge"
            text={focusedPost?.upVotes === null || 0 ? 0 : focusedPost?.upVotes}
            color="#ff4d4f"
            placement="start"
          >
            <Card
              className="feed-card focused-post-card"
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
              // style={{ width: 600 }}
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
                {focusedPost?.postCode !== "" &&
                  focusedPost?.postCode !== null && (
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
                        key={focusedPost.id}
                        language={focusedPost.codeType}
                        style={rainbow}
                      >
                        {focusedPost?.postCode}
                      </SyntaxHighlighter>
                    </div>
                  )}
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
                          className="badge"
                          text={
                            reply?.upVotes === null || 0 ? 0 : reply?.upVotes
                          }
                          color="#ff4d4f"
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
                    {editReplyActive ? (
                      <EditReply
                        getFocusedPost={getPost}
                        post={post}
                        focusedReplyEdit={focusedReplyEdit}
                        editReply={editReply}
                        editReplyOff={editReplyOff}
                        reply={reply}
                        // getPosts={getPosts}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              <Divider />
              <Collapse ghost>
                <Panel
                  showArrow={false}
                  key="1"
                  extra={
                    token ? (
                      <Button
                        type="ghost"
                        onClick={() => {
                          replyOn();
                          addReply(focusedPost);
                        }}
                      >
                        Add Reply
                      </Button>
                    ) : (
                      <Button
                        type="ghost"
                        disabled
                        onClick={() => {
                          replyOn();
                          addReply(focusedPost);
                        }}
                      >
                        Add Reply
                      </Button>
                    )
                  }
                >
                  {replyActive ? (
                    <CreateReply
                      getFocusedPost={getPost}
                      post={post}
                      focusedReply={focusedReply}
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
        {editPostActive ? (
          <EditPost
            getFocusedPost={getPost}
            post={post}
            focusedPostEdit={focusedPostEdit}
            editPost={editPost}
            editPostOff={editPostOff}
            post={post}
            // getPosts={getPosts}
          />
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={16} lg={14} xl={14} xxl={14}>
        {/* <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}> */}
        {displayPost()}
      </Col>
    </Row>
  );
};

export default withRouter(FocusedPost);
