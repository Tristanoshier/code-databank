import React, { useState } from "react";
import CreatePost from "../Posts/CreatePost";
import { Card, Divider, Button, Skeleton } from "antd";

const DashboardCard = ({
  postActive,
  postOn,
  postOff,
  getPosts,
  loggedInUser,
  loading,
}) => {
  const firstName = localStorage.getItem("firstName");

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

  return (
    <div>
      {loading ? (
        <Card
          title={[
            <i className="fas fa-portrait"></i>,
            `${firstName}'s Dashboard`,
            ,
          ]}
        >
          <div className="dashboard-content">
            <p>Posts: {totalPosts}</p>
            <p>Replies: {totalRepliesReduced}</p>
            <p>Post Votes: {totalPostUpvotes}</p>
          </div>
          <Divider />
          <div className="dashboard-footer">
            <h5>Activity</h5>
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
