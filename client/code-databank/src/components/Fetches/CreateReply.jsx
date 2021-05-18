import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import GetPosts from "../Fetches/GetPosts";

const { TextArea } = Input;

const CreateReply = ({ token, createReply, replyOff, fetchPosts }) => {
  const [replyMessage, setReplyMessage] = useState("");

  const handleSubmit = () => {
    fetch(`http://localhost:3000/replies/${createReply.id}`, {
      method: "POST",
      body: JSON.stringify({
        replyMessage: replyMessage,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        replyOff();
        setReplyMessage("");
        GetPosts(token);
      });
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onFinish={handleSubmit}
    >
      <Form.Item>
        <TextArea
          style={{ width: 550, maxWidth: 550 }}
          row={8}
          name="reply"
          value={replyMessage}
          required
          onChange={(e) => setReplyMessage(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="ghost" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CreateReply;
