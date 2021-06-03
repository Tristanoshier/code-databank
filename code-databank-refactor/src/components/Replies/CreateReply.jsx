import React, { useState, useContext } from "react";
import { Form, Input, Button } from "antd";
import { TokenContext } from "../../App";
<<<<<<< HEAD
import { GetPostsContext } from "../Feed/FeedIndex";
import "./CreateReply.css";
=======
>>>>>>> 46202fc795cea8c725b96e89317b98b60fe905de

const { TextArea } = Input;

const CreateReply = ({ createReply, replyOff }) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [replyCode, setReplyCode] = useState("");
  const [codeActive, setCodeActive] = useState(false);

  const token = useContext(TokenContext);

  const handleSubmit = () => {
    fetch(`http://localhost:3000/replies/${createReply.id}`, {
      method: "POST",
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
      .then(() => {
        setReplyMessage("");
        setReplyCode("");
        replyOff();
      });
  };

  const codeOn = () => {
    setCodeActive(!codeActive);
    setReplyCode("");
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
      onFinish={handleSubmit}
    >
      <Form.Item>
        <TextArea
          style={{ width: "100%" }}
          autoSize={{ minRows: 4 }}
          name="reply"
          value={replyMessage}
          required
          onChange={(e) => setReplyMessage(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="ghost"
          onClick={() => {
            codeOn();
          }}
        >
          Add Code Snippet?{" "}
          <i style={{ marginLeft: "5px" }} className="fas fa-code"></i>
        </Button>
      </Form.Item>

      {codeActive ? (
        <Form.Item>
          <h5>Add Code Here</h5>
          <TextArea
            style={{ width: "100%", marginTop: "5px" }}
            autoSize={{ minRows: 4 }}
            name="replyCode"
            value={replyCode}
            onChange={(e) => setReplyCode(e.target.value)}
          />
        </Form.Item>
      ) : (
        <></>
      )}
      <Form.Item>
        <Button type="ghost" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateReply;
