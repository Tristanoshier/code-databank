import React from "react";
import DashboardCard from "./DashboardCard";

const DashboardDisplay = ({
  postActive,
  postOn,
  postOff,
  getPosts,
  user,
  loading
}) => {
  return (
    <>
      {user.map((loggedInUser) => (
        <DashboardCard
          key={loggedInUser.id}
          loading={loading}
          loggedInUser={loggedInUser}
          postActive={postActive}
          postOn={postOn}
          postOff={postOff}
          getPosts={getPosts}
        />
      ))}
    </>
  );
};

export default DashboardDisplay;
