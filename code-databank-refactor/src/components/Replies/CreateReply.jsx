import React, { useState, useContext } from "react";
import { Form, Input, Button } from "antd";
import { TokenContext } from "../../App";
import { GetPostsContext } from "../Feed/FeedIndex";

const { TextArea } = Input;

const CreateReply = ({ createReply, replyOff }) => {
  const [replyMessage, setReplyMessage] = useState("");

  const token = useContext(TokenContext);
  const getPosts = useContext(GetPostsContext);

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
        setReplyMessage("");
        getPosts();
        replyOff();
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
