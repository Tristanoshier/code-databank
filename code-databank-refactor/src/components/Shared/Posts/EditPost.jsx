import React, { useState, useContext } from "react";
import { Form, Input, Card, Select, Modal, notification } from "antd";
import { TokenContext } from "../../../App";

const { TextArea } = Input;
const { Option } = Select;

const EditPost = (props) => {
  const [postTitle, setPostTitle] = useState(props.post?.postTitle);
  const [postMessage, setPostMessage] = useState(props.post?.postMessage);
  const [postType, setPostType] = useState(props.post?.postType);
  const [codeType, setCodeType] = useState(props.post?.codeType);

  const token = useContext(TokenContext);

  const openUpdateNotification = () => {
    const args = {
      message: "Post Updated!",
      duration: 1,
    };
    notification.open(args);
  };

  const handleCancel = () => {
    props.editPostOff();
  };

  const handleSubmit = () => {
    try {
      fetch(`http://localhost:3000/posts/${props.editPost.id}`, {
        method: "PUT",
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
        .then(() => {
          props.editPostOff();
          openUpdateNotification();
          props.getPosts(false);
          setPostTitle("");
          setPostMessage("");
          setPostType("");
          setCodeType("");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title={props.editPost.postTitle}
      visible={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Submit"
    >
      <Card style={{ width: "100%" }} bordered={false} className="edit-card">
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
              name="postMessage"
              autoSize={{ minRows: 8 }}
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

export default EditPost;
