import React, { useState } from "react";
import CreatePost from "../Posts/CreatePost";
import { Card, Divider, Button, Skeleton, Badge } from "antd";
import { Link } from "react-router-dom";

const DashboardCard = ({
  postActive,
  postOn,
  postOff,
  getPosts,
  loggedInUser,
  loading,
  posts,
}) => {
  const firstName = localStorage.getItem("firstName");

  // dashboard counts ---------------

  let totalPostUpvotes = loggedInUser?.posts.reduce(function (a, b) {
    let total = 0;
    total = a + b.upVotes;
    return total;
  }, 0);

  let totalPosts = loggedInUser?.posts.length;

  let totalReplies = loggedInUser?.posts.map((post) => {
    return post.replies.length;
  });

  let totalRepliesReduced = totalReplies.reduce(function (a, b) {
    let total = 0;
    total = a + Number(b);
    return total;
  }, 0);

  // focused post from dashboard ---------------
  const savePostInLocalStorage = (post) => {
    localStorage.setItem("post", JSON.stringify(post));
  };

  return (
    <div>
      {loading ? (
        <Card
          title={[
            <i
              className="fas fa-portrait"
              style={{ paddingRight: "10px" }}
            ></i>,
            `${firstName}'s Dashboard`,
            ,
          ]}
        >
          <div className="dashboard-content">
            {/* <p>Posts: {totalPosts}</p>
            <p>Replies: {totalRepliesReduced}</p>
            <p>Score: {totalPostUpvotes}</p> */}
            <div className="dashboard-stats">
              <table>
                <tr>
                  <th>Posts</th>
                  <th>Replies</th>
                  <th>Score</th>
                </tr>
                <tr>
                  <td>{totalPosts}</td>
                  <td>{totalRepliesReduced}</td>
                  <td>{totalPostUpvotes}</td>
                </tr>
              </table>
            </div>
            <Divider orientation="left">
              <h5>Popular Posts</h5>
            </Divider>
            {posts
              ?.sort((a, b) => {
                return b.upVotes - a.upVotes;
              })
              .slice(0, 5)
              .map((post) => (
                <div className="popular-topics-container">
                  {post.upVotes >= 99 ? (
                    <div className="post-badge">99+</div>
                  ) : post.upVotes === null ? (
                    <div className="post-badge">0</div>
                  ) : (
                    <div className="post-badge">{post.upVotes}</div>
                  )}
                  <div className="topic-title-container">
                    <Link
                      onClick={() => savePostInLocalStorage(post)}
                      to={{
                        pathname: `/focusedPost/${post?.postTitle}`,
                        post: post,
                      }}
                    >
                      <h5 id="popular-topics-title">{post.postTitle}</h5>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          <Divider />
          <div className="dashboard-footer">
            <Link to="/profile">
              <h5>Profile</h5>
            </Link>
            <h5>Placeholder</h5>
          </div>
          <div className="dashboard-post-button">
            <Button type="default" onClick={() => postOn()}>
              Create a post
            </Button>
          </div>
          {postActive ? (
            <CreatePost postOff={postOff} getPosts={getPosts} />
          ) : (
            <></>
          )}
        </Card>
      ) : (
        <Skeleton active />
      )}
    </div>
  );
};

export default DashboardCard;
