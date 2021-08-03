import React, { useState, useEffect, useContext } from "react";
import Auth from "../../../../Auth/Auth";
import CreatePost from "../../../../Shared/Posts/CreatePost";
import { Card, Divider, Button, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { TokenContext } from "../../../../../App";

const DashboardCard = ({
  postActive,
  postOn,
  postOff,
  getPosts,
  loggedInUser,
  loading,
  posts,
  // isAuth,
  // setIsAuth,
}) => {
  const firstName = localStorage.getItem("firstName");
  const token = useContext(TokenContext);
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    getPopularPosts();
  }, [posts]);

  const getPopularPosts = () => {
    try {
      fetch(`https://cd-server.herokuapp.com/posts/popular/dashboard`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          // Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPopularPosts(data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  // dashboard counts ---------------

  let totalPostUpvotes =
    loggedInUser &&
    loggedInUser?.posts.reduce(function (a, b) {
      let total = 0;
      total = a + b.upVotes;
      return total;
    }, 0);

  let totalPosts = loggedInUser && loggedInUser?.posts.length;

  let totalReplies =
    loggedInUser &&
    loggedInUser?.posts.map((post) => {
      return post.replies.length;
    });

  let totalRepliesReduced =
    loggedInUser &&
    totalReplies.reduce(function (a, b) {
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
      <Card
        title={[
          <i className="fas fa-portrait" style={{ paddingRight: "10px" }}></i>,
          loggedInUser ? `${firstName}'s Dashboard` : "Login to contribute",
        ]}
      >
        <div className="dashboard-content">
          {loggedInUser ? (
            <div className="dashboard-stats">
              <table>
                <thead>
                  <tr>
                    <th>Posts</th>
                    <th>Replies</th>
                    <th>Rep</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{totalPosts}</td>
                    <td>{totalRepliesReduced}</td>
                    <td>{totalPostUpvotes}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <Auth />
          )}
          <Divider orientation="left">
            <h5>Popular Posts</h5>
          </Divider>
          {popularPosts?.slice(0, 5).map((post) => (
            <div key={post.id} className="popular-topics-container">
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
          {loggedInUser ? (
            <>
              <Link to="/profile">
                <h5>Profile</h5>
              </Link>
              <Link to="/search">
                <h5>Search</h5>
              </Link>
              <Link to="/popular">
                <h5>Popular</h5>
              </Link>
            </>
          ) : (
            <>
              <Link to="/search">
                <h5>Search</h5>
              </Link>
              <Link to="/popular">
                <h5>Popular</h5>
              </Link>
            </>
          )}
        </div>
        <div className="dashboard-post-button">
          {loggedInUser ? (
            <Button type="default" onClick={() => postOn()}>
              Create a post
            </Button>
          ) : (
            <Button type="default" disabled onClick={() => postOn()}>
              Create a post
            </Button>
          )}
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
