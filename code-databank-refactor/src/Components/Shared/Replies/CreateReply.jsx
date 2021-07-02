import React, { useState, useContext } from "react";
import { Form, Input, Button, Collapse } from "antd";
import { TokenContext } from "../../../App";

const { Panel } = Collapse;
const { TextArea } = Input;

const CreateReply = ({
  createReply,
  replyOff,
  getPosts,
  getFocusedPost,
  focusedReply,
  post,
  closeCollapsePanel
}) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [replyCode, setReplyCode] = useState("");
  const [codeActive, setCodeActive] = useState(false);

  const token = useContext(TokenContext);

  const handleSubmit = async () => {
    await fetch(`http://localhost:3000/replies/${createReply.id}`, {
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
        if (focusedReply) {
          getFocusedPost(post);
          setReplyMessage("");
          setReplyCode("");
          closeCollapsePanel();
          replyOff();
        } else if (!focusedReply) {
          getPosts(false);
          setReplyMessage("");
          setReplyCode("");
          closeCollapsePanel();
          replyOff();
        } else return;
      });
  };

  const codeOn = () => {
    setCodeActive(true);
    // setReplyCode("");
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
            {codeActive ? (
              <div>
                <h5>Add Code Here</h5>
                <TextArea
                  style={{ width: "100%", marginTop: "5px" }}
                  autoSize={{ minRows: 4 }}
                  name="replyCode"
                  value={replyCode}
                  onChange={(e) => setReplyCode(e.target.value)}
                />
              </div>
            ) : (
              <></>
            )}
          </Panel>
        </Collapse>
      </Form.Item>

      {/* OLD */}
      {/* {codeActive ? (
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
      )} */}
      <Form.Item>
        <Button type="ghost" htmlType="submit">
          Submit
        </Button>
        <Button onClick={() => closeCollapsePanel()} danger>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateReply;
