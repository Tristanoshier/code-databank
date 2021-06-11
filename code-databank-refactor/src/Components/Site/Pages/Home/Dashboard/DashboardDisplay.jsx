import React from "react";
import DashboardCard from "./DashboardCard";

const DashboardDisplay = ({
  postActive,
  postOn,
  postOff,
  getPosts,
  user,
  loading,
  posts,
}) => {
  return (
    <>
      {user.map((loggedInUser, index) => (
        <DashboardCard
          key={index}
          loading={loading}
          loggedInUser={loggedInUser}
          postActive={postActive}
          postOn={postOn}
          postOff={postOff}
          getPosts={getPosts}
          posts={posts}
        />
      ))}
    </>
  );
};

export default DashboardDisplay;
