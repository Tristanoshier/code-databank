import React from "react";
import DashboardCard from "./DashboardCard";
import { Skeleton, Card } from "antd";

const DashboardDisplay = ({
  postActive,
  postOn,
  postOff,
  getPosts,
  user,
  loading,
  posts,
  setPostChange,
}) => {
  return (
    <>
      {loading ? (
        <Card>
          <Skeleton active paragraph={{ rows: 10 }} />
        </Card>
      ) : (
        user.map((loggedInUser) => (
          <div key={loggedInUser.id}>
            <DashboardCard
              loading={loading}
              loggedInUser={loggedInUser}
              postActive={postActive}
              postOn={postOn}
              postOff={postOff}
              getPosts={getPosts}
              posts={posts}
              setPostChange={setPostChange}
            />
          </div>
        ))
      )}
    </>
  );
};

export default DashboardDisplay;
