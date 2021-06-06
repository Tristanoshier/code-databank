import React, { useState } from "react";
import CreatePost from "../Posts/CreatePost";
import { Card, Divider, Button, Badge } from "antd";

const DashboardCard = ({
  postActive,
  postOn,
  postOff,
  getPosts,
  loggedInUser,
}) => {
  const firstName = localStorage.getItem("firstName");

  let totalUpvotes = loggedInUser?.posts.reduce(function (a, b) {
    let total = 0;
    total = a + b.upVotes;
    return total;
  }, 0);

  return (
    <div>
      <Card
        title={[<i className="fas fa-user"></i>, `Welcome ${firstName}`, ,]}
      >
        <div className="dashboard-content">
          <p>Post Votes: {totalUpvotes}</p>
          <p>Votes: 246</p>
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
    </div>
  );
};

export default DashboardCard;
