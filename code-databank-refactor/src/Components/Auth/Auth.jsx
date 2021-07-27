import React, { useState } from "react";
import { Card, Input, Button, Spin, message, Form } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import sitelogo from "../Site/assets/efa-site-logo.jpeg";
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

  const handleSubmit = () => {

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

  const authButtonTitle = () => {
    return login ? "Need to Register?" : "Need to Login?";
  }

  const registerFields = () => {
    return !login ? (
      <div>
        {/* First Name */}
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name.' }]}
        >
          <Input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>

        {/* Last Name */}
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name.' }]}
        >
          <Input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>
      </div>
    ) : <></>
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const authForm = () => {
    return (
      <div>
        <Form
          name="basic"
          labelCol={login ? { span: 7 } : {span: 9}}
          wrapperCol={{ span: 14 }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}>

          {registerFields()}

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email.' }]}
          >
            <Input
              type="text"
              id="email"
              value={email}
              placeholder="email@email.com"
              onChange={(e) => setEmail(e.target.value)}
              prefix={<UserOutlined />}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password.' }]}
          >
            <Input.Password value={password}
              onChange={(e) => setPassword(e.target.value)}
              prefix={<LockOutlined />} />
          </Form.Item>

          {/* Confirm Password */}
          {!login && (
            <>
              <Form.Item
                label="Confirm Password"
                name="passwordConfirm"
                rules={[{ required: true, message: 'Please input your password.' }]}
              >
                <Input.Password
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  prefix={<LockOutlined />}
                />
              </Form.Item>
            </>
          )}

          {/* Buttons */}
          <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
            <div>
              {!loading ? (
                <div>
                  <Button type="primary" htmlType="submit" danger>
                    {authTitle()}
                  </Button>
                  <Button type="link" htmlType="button" onClick={loginToggle}>
                    {authButtonTitle()}
                  </Button>
                </div>
              ) : (
                <Spin indicator={loadingIcon} />
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  };

  return (
    <div className="auth">
      <Card
        className="auth-card"
        cover={
          <img
            alt="mobile-shield"
            src={sitelogo}
          />
        }
        actions={[
          <p>Forgot Password?</p>,
          <a href="https://learninggym-3a62e.web.app/" target="_blank">Learning Gym</a>,
        ]}
      >
        <Meta
          description={authForm()}
        />
      </Card>
    </div>
  );
};

export default Auth;
