import React from "react";
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
import SyntaxHighlighter from "react-syntax-highlighter";
import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ProfileCard = ({ post, getPosts }) => {
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

  return (
    // <div>
    //   <Card>
    //     <p>{props.post.postTitle}</p>
    //   </Card>
    // </div>
    <div key={post.id}>
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
              {/* <div className="card-header-arrow-container">
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
                </div> */}

              <div className="container-sub">
                {iconType()}
                {post?.codeType}
              </div>
            </div>,
          ]}
          // extra={[
          //   <>
          //     <Button type="link" onClick={toggleIcon}>
          //       {icon}
          //     </Button>
          //   </>,
          //   cardDropdown(),
          // ]}
        >
          <div className="postTitle-container">
            <h4 id="postTitle">{post?.postTitle}</h4>
          </div>
          <hr id="postTitle-hr" />

          <h4>{post?.postType}</h4>
          <div className="post-container">
            {post?.postMessage.split("\n").map((message) => (
              <p>{message}</p>
            ))}
            {post.postCode != "" || null ? (
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

          <Divider />
          {/* <div className="post-footer">
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
            </div> */}
          {/* <div className="add-reply-container">
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
            </div> */}
        </Card>
      </Badge.Ribbon>
    </div>

    // </div>
  );
};

export default ProfileCard;
