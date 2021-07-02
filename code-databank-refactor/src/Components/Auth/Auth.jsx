import React, { useState } from "react";
import { Card, Avatar, Input, Button, Spin, message } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import "./Auth.css";

const Auth = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);

  const { Meta } = Card;
  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!login && password !== passwordConfirm) {
      passwordMatchFailure();
      setPassword("");
      setPasswordConfirm("");
      setLoading(false);

      return;
    }

    const url = login
      ? "http://localhost:3000/user/login"
      : "http://localhost:3000/user/register";

    const authBodyObj = login
      ? {
          email: email,
          password: password,
        }
      : {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authBodyObj),
    })
      .then((res) => {
        if (!res.ok) {
          loginFailed();
          setEmail("");
          setPassword("");
          setPasswordConfirm("");
          setLoading(false);
        }
        return res.json();
      })
      .then((data) => {
        props.updateToken(data.token);
        props.updatedFirstName(data.user.firstName);
        props.updatedUserId(data.user.id);
      });
    // .catch((err) => {
    //   console.log(err);
    //   setEmail("");
    //   setPassword("");
    //   setLoading(false);
    // });
    setLoading(true);
  };

  const loginFailed = () => {
    message.error("Login failed");
  };

  const passwordMatchFailure = () => {
    message.error("Passwords do not match");
  };

  const loginToggle = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  const authTitle = () => {
    return login ? "Login" : "Register";
  };

  const authButtonToggle = () => {
    return login ? (
      <div>
        <Button type="primary" danger onClick={loginToggle}>
          Need to Register?
        </Button>
      </div>
    ) : (
      <Button type="primary" danger onClick={loginToggle}>
        Need to Login?
      </Button>
    );
  };

  const registerFields = () => {
    return !login ? (
      <div>
        <label htmlFor="firstName" style={{ fontSize: "1rem" }}>
          First Name
        </label>
        <br />
        <Input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <label htmlFor="lastName" style={{ fontSize: "1rem" }}>
          Last Name
        </label>
        <br />
        <Input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
    ) : null;
  };

  const authForm = () => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          {registerFields()}
          <label
            htmlFor="email"
            style={{ fontSize: "1rem", paddingRight: "1rem" }}
          >
            Email:
          </label>
          {/* <br /> */}
          <Input
            type="text"
            id="email"
            value={email}
            placeholder="email@email.com"
            onChange={(e) => setEmail(e.target.value)}
            prefix={<UserOutlined />}
          />
          <br />
          <label htmlFor="password" style={{ fontSize: "1rem" }}>
            Password:
          </label>
          <br />
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined />}
          />
          {!login && (
            <>
              <br />

              <label htmlFor="passwordConfirm" style={{ fontSize: "1rem" }}>
                Confirm Password:
              </label>
              <br />
              <Input
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                prefix={<LockOutlined />}
              />
            </>
          )}
          <br />
          <br />
          <div>
            {!loading ? (
              <Button htmlType="submit" type="primary" danger>
                {authTitle()}
              </Button>
            ) : (
              <Spin indicator={loadingIcon} />
            )}
          </div>
          <br />
          {authButtonToggle()}
        </form>
      </div>
    );
  };

  return (
    <div className="auth">
      <Card
        cover={
          <img
            alt="mobile-shield"
            src="https://elevenfifty.org/wp-content/uploads/2019/03/mobile-shield.png"
          />
        }
        actions={[
          <p>Forgot Password?</p>,
          <a href="https://learninggym-3a62e.web.app/">Learning Gym</a>,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={authTitle()}
          description={authForm()}
        />
      </Card>
    </div>
  );
};

export default Auth;
