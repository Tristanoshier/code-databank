import React, { useState, useContext } from "react";
import {
  Form,
  Input,
  Card,
  Select,
  Modal,
  Collapse,
  Button,
  notification,
} from "antd";
import { TokenContext } from "../../../App";
import { useLocation } from "react-router";
import APIURL from "../../../helpers/environment";

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const CreatePost = ({ postOff, getPosts }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postMessage, setPostMessage] = useState("");
  const [postCode, setPostCode] = useState("");
  const [postType, setPostType] = useState("Question");
  const [codeType, setCodeType] = useState("JavaScript");
  const [postCodeActive, setPostCodeActive] = useState(false);

  const token = useContext(TokenContext);

  const openCreatedPostNotification = () => {
    const args = {
      message: "Success!",
      description: "Your post has been created!",
      duration: 1,
    };
    notification.open(args);
  };

  const codeOn = () => {
    setPostCodeActive(true);
  };

  const handleCancel = () => {
    postOff();
  };

  const codeOff = () => {
    setPostCodeActive(false);
  };

  const handleSubmit = async () => {
    const settings = {
      method: "POST",
      body: JSON.stringify({
        postTitle: postTitle,
        postMessage: postMessage,
        postCode: postCode,
        postType: postType,
        codeType: codeType,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    };

    try {
      const response = await fetch(`${APIURL}/posts`, settings);
      const data = await response.json();

      postOff();
      codeOff();
      openCreatedPostNotification();
      getPosts(false);
      setPostTitle("");
      setPostMessage("");
      setPostCode("");
      setPostType("");
      setCodeType("");

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Create a post!"
      visible={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Submit"
    >
      <Card style={{ width: "100%" }} bordered={false}>
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

          <Collapse ghost>
            <Panel
              showArrow={false}
              key="1"
              extra={
                <Button
                  type="ghost"
                  onClick={() => {
                    codeOn();
                  }}
                >
                  Add Code Snippet?{" "}
                  <i style={{ marginLeft: "5px" }} className="fas fa-code"></i>
                </Button>
              }
            >
              {postCodeActive && (
                <Form.Item label="Code">
                  <TextArea
                    autoSize={{ minRows: 6 }}
                    name="postCode"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                  />
                </Form.Item>
              )}
            </Panel>
          </Collapse>
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
