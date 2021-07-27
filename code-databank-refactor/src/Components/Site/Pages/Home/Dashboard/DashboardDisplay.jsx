import React, { useContext } from "react";
import { TokenContext } from "../../../../../App";
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
  // isAuth,
  // setIsAuth,
}) => {
  const token = useContext(TokenContext);

  const displayDashboard = () => {
    return loading ? (
      <Card>
        <Skeleton active paragraph={{ rows: 10 }} />
      </Card>
    ) : (
      isLoggedIn()
    );
  };

  const isLoggedIn = () => {
    return token ? (
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
    ) : (
      <DashboardCard
        loading={loading}
        // loggedInUser={loggedInUser}
        // postActive={postActive}
        // postOn={postOn}
        // postOff={postOff}
        getPosts={getPosts}
        posts={posts}
        // setPostChange={setPostChange}
      />
    );
  };
  return (
    <>
      {/* {loading ? (
        <Card>
          <Skeleton active paragraph={{ rows: 10 }} />
        </Card>
      ) : !user ? (
        <DashboardCard
          loading={loading}
          getPosts={getPosts}
          posts={posts}
        />
      ) : (
        user.map((loggedInUser) => (
          <div key={loggedInUser.id}>
            <DashboardCard
              // isAuth={isAuth}
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
      )} */}
      {displayDashboard()}
    </>
  );
};

export default DashboardDisplay;
