import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "../../App";
import { Card, Collapse, Button, Divider, Input, Form, message } from "antd";

const { Panel } = Collapse;

const ProfileOverview = (props) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const token = useContext(TokenContext);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch("https://cd-server.herokuapp.com/user/loggedInUser", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      });
  };

  const updatePassword = async (loggedInUser) => {
    // e.preventDefault();
    if (password !== passwordConfirm) {
      passwordMatchFailure();
      setPassword("");
      setPasswordConfirm("");
      return;
    }

    const settings = {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
      body: JSON.stringify({
        password: password,
      }),
    };

    const response = await fetch(
      `https://cd-server.herokuapp.com/user/loggedInUser/password/${loggedInUser.id}`,
      settings
    );
    const data = await response.json();
    updatedPasswordConfirm();
    setPassword("");
    setPasswordConfirm("");
    return data;
  };

  const updateEmail = async (loggedInUser) => {
    // e.preventDefault();
    if (email !== emailConfirm) {
      emailMatchFailure();
      setEmail("");
      setEmailConfirm("");
      return;
    }

    const settings = {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
      body: JSON.stringify({
        email: email,
      }),
    };

    const response = await fetch(
      `https://cd-server.herokuapp.com/user/loggedInUser/email/${loggedInUser.id}`,
      settings
    );
    const data = await response.json();
    updatedEmailConfirm();
    setEmail("");
    setEmailConfirm("");
    return data;
  };

  const passwordMatchFailure = () => {
    message.error("Passwords do not match");
  };
  const emailMatchFailure = () => {
    message.error("Emails do not match");
  };

  const updatedEmailConfirm = () => {
    message.success("Email succesfully changed");
  };

  const updatedPasswordConfirm = () => {
    message.success("Password succesfully changed");
  };

  const savePostInLocalStorage = (post) => {
    localStorage.setItem("post", JSON.stringify(post));
  };

  const profileMapper = () => {
    return user.map((loggedInUser) => {
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
        <Card
          key={loggedInUser.id}
          title={`${loggedInUser.firstName}'s Profile`}
          className="feed-card"
        >
          <table
            style={{ width: "100%", border: "none", marginBottom: "20px" }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "none",
                  }}
                >
                  Posts
                </th>
                <th
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "none",
                  }}
                >
                  Replies
                </th>
                <th
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "none",
                  }}
                >
                  Rep
                </th>
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

          <Collapse
            defaultActiveKey={loggedInUser.posts.length >= 20 ? 0 : 1}
            ghost
          >
            <Panel
              showArrow={true}
              key="1"
              header={<h4>Your Posts ({loggedInUser.posts.length})</h4>}
            >
              <div>
                {loggedInUser.posts.length === 0 ? (
                  <p>Looks like you haven't posted anything.</p>
                ) : (
                  loggedInUser.posts.map((post) => (
                    <div key={post.id}>
                      <Link
                        onClick={() => savePostInLocalStorage(post)}
                        to={{
                          pathname: `/focusedPost/${post?.postTitle}`,
                          post: post,
                        }}
                      >
                        <p>{post.postTitle}</p>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </Panel>
          </Collapse>
          <Divider />
          <div className="profile-overview-footer">
            <div style={{ width: "50%" }}>
              <Collapse ghost>
                <Panel showArrow={false} key="1" header="Change Email">
                  <Divider />
                  <Form layout="vertical">
                    <Form.Item label="Current Email">
                      <Input type="text" value={loggedInUser.email} />
                    </Form.Item>
                    <Form.Item label="New Email">
                      <Input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item label="Confirm Email">
                      <Input
                        type="text"
                        value={emailConfirm}
                        onChange={(e) => setEmailConfirm(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={() => updateEmail(loggedInUser)}
                      >
                        Update
                      </Button>
                    </Form.Item>
                  </Form>
                </Panel>
              </Collapse>
            </div>
            <div style={{ width: "50%" }}>
              <Collapse ghost>
                <Panel
                  showArrow={false}
                  key="1"
                  header="Change Password"
                  style={{ textAlign: "right" }}
                >
                  <Divider />
                  <Form layout="vertical">
                    <Form.Item label="New Password">
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item label="Confirm Password">
                      <Input
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={() => updatePassword(loggedInUser)}
                      >
                        Update
                      </Button>
                    </Form.Item>
                  </Form>
                </Panel>
              </Collapse>
            </div>
          </div>
        </Card>
      );
    });
  };

  return <div>{profileMapper()}</div>;
};

export default ProfileOverview;
