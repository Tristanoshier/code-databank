import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Card, Select } from "antd";

const CreatePost = ({ token, getPosts }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postMessage, setPostMessage] = useState("");
  const [postType, setPostType] = useState("");
  const [codeType, setCodeType] = useState("");

  const handleSubmit = async () => {
    console.log(token);
    try {
      fetch("http://localhost:3000/posts", {
        method: "POST",
        body: JSON.stringify({
          postTitle: postTitle,
          postMessage: postMessage,
          postType: postType,
          codeType: codeType,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          getPosts();
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card style={{ width: 500 }}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Form.Item label="Title">
          <Input
            name="postTitle"
            value={postTitle}
            required
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Message">
          <Input
            name="postMessage"
            value={postMessage}
            required
            onChange={(e) => setPostMessage(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Post Type">
          <Input
            name="postType"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Code Type">
          <Input
            name="codeType"
            value={codeType}
            onChange={(e) => setCodeType(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Submit">
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreatePost;
