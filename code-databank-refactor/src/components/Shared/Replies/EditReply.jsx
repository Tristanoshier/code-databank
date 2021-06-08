import React, { useState, useContext } from "react";
import { Form, Input, Card, Modal, notification } from "antd";
import { TokenContext } from "../../../App";

const { TextArea } = Input;

const EditReply = (props) => {
  const [replyMessage, setReplyMessage] = useState(props.reply?.replyMessage);
  const [replyCode, setReplyCode] = useState(props.reply?.replyCode);

  const token = useContext(TokenContext);

  const openUpdateNotification = () => {
    const args = {
      message: "Reply Updated!",
      duration: 1,
    };
    notification.open(args);
  };

  const handleCancel = () => {
    props.editReplyOff();
  };

  const handleSubmit = () => {
    fetch(`http://localhost:3000/replies/${props.editReply.id}`, {
      method: "PUT",
      body: JSON.stringify({
        replyMessage: replyMessage,
        replyCode: replyCode,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.editReplyOff();
        openUpdateNotification();
        props.getPosts();
        setReplyMessage("");
        setReplyCode("");
      });
  };

  return (
    <Modal
      title="Edit Your Reply"
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
          <Form.Item label="Message">
            <TextArea
              name="replyMessage"
              autoSize={{ minRows: 8 }}
              value={replyMessage}
              required
              onChange={(e) => setReplyMessage(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Code">
            <TextArea
              name="replyCode"
              autoSize={{ minRows: 8 }}
              value={replyCode}
              required
              onChange={(e) => setReplyCode(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};

export default EditReply;
