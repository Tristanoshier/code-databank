import React, { useContext } from "react";
import { Card, Collapse, Badge, Divider, Button } from "antd";

const { Panel } = Collapse;
import SyntaxHighlighter from "react-syntax-highlighter";
import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { TokenContext } from "../../App";

const ProfileCard = ({ post, getPosts }) => {
  const token = useContext(TokenContext);

  const removeSavedPost = (post) => {
    try {
      fetch(`http://localhost:3000/profile/${post.id}`, {
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
    } catch (error) {
      console.log(error);
    }
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
              <div className="container-sub">
                {iconType()}
                {post?.codeType}
              </div>
            </div>,
          ]}
          extra={[
            <Button type="text" onClick={() => removeSavedPost(post)}>
              <i className="fas fa-times-circle"></i>
            </Button>,
          ]}
        >
          <div className="postTitle-container">
            <h4 id="postTitle">{post?.postTitle}</h4>
          </div>
          <hr id="postTitle-hr" />

          <h4>{post?.postType}</h4>
          <div className="post-container">
            <p>{post?.postMessage}</p>

            {post?.postCode != "" || null ? (
              <div className="post-code">
                <SyntaxHighlighter
                  lineProps={{
                    style: {
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
