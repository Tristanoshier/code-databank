import React, { useState, useContext } from "react";
import { Form, Input, Card, Select, Modal, notification } from "antd";

import { createPostService } from "../Services/PostService";
import { TokenContext } from "../../App";

const { TextArea } = Input;
const { Option } = Select;

const CreatePost = ({ postOff, getPosts }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postMessage, setPostMessage] = useState("");
  const [postType, setPostType] = useState("Question");
  const [codeType, setCodeType] = useState("JavaScript");

  const token = useContext(TokenContext);

  const handleCancel = () => {
    postOff();
  }

  const openCreatedPostNotification = () => {
    const args = {
      message: "Success!",
      description: "Your post has been created!",
      duration: 1,
    }
    notification.open(args);
  }

  const handleSubmit = () => {
    if (createPostService(postTitle, postMessage, postType, codeType, token) === true) {
      postOff();
      setPostTitle("");
      setPostMessage("");
      setPostType("");
      setCodeType("");
      openCreatedPostNotification();
    } else  {
      console.log('throw error');
    }
    getPosts();
  }

  return (
    <Modal
      title="Create a post!"
      visible={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Submit"
    >
      <Card style={{ width: 500 }} bordered={false}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
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
            <TextArea
              autoSize={{ minRows: 6 }}
              name="postMessage"
              value={postMessage}
              required
              onChange={(e) => setPostMessage(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Post Type">
            <Select
              value={postType}
              defaultActiveFirstOption={true}
              onChange={(value) => {
                setPostType(value);
              }}
            >
              <Option value="Question">Question</Option>
              <Option value="Error">Error</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Code Type">
            <Select
              value={codeType}
              defaultActiveFirstOption={true}
              onChange={(value) => {
                setCodeType(value);
              }}
            >
              <Option value="HTML">HTML</Option>
              <Option value="CSS">CSS</Option>
              <Option value="JavaScript">JavaScript</Option>
              <Option value="React">React</Option>
              <Option value="Github">Github</Option>
            </Select>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};

export default CreatePost;
