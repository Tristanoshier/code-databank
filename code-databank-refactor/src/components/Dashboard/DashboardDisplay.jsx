import React from "react";
import DashboardCard from "./DashboardCard";

const DashboardDisplay = ({ postActive, postOn, postOff, getPosts, user }) => {
  return (
    <>
      {user.map((loggedInUser) => (
        <DashboardCard
          key={loggedInUser.id}
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
