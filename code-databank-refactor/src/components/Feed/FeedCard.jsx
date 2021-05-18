import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Row, Col, Card, Collapse, Badge, Divider, Button, Form } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import CreateReply from "../Replies/CreateReply";

const { Panel } = Collapse;

const FeedCard = ({
  token,
  post,
  index,
  replyOn,
  replyOff,
  addReply,
  createReply,
  getPosts,
}) => {
  const [upvoteCount, setUpvoteCount] = useState();

  const upVote = (reply) => {
    let newUpvotes = reply.upVotes + 1;
    fetch(`http://localhost:3000/replies/${reply.id}`, {
      method: "PUT",
      body: JSON.stringify({
        replyMessage: reply.replyMessage,
        upVotes: newUpvotes,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpvoteCount(newUpvotes);
        getPosts();
      });
  };

  const downVote = (reply) => {
    let newUpvotes = reply.upVotes + 1;
    fetch(`http://localhost:3000/replies/${reply.id}`, {
      method: "PUT",
      body: JSON.stringify({
        replyMessage: reply.replyMessage,
        upVotes: newUpvotes,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpvoteCount(newUpvotes);
        getPosts();
      });
  };

  return (
    <Row justif="center">
      <Col span={8}>
        <Card
          title={post.postTitle}
          style={{ width: 600, marginBottom: "40px", borderRadius: "5px" }}
        >
          <p>{post.postType}</p>
          {post?.replies?.map((reply, index) => (
            <div>
              <Row justify="center" align="start">
                <Col span={2}>
                  <div>
                    <ArrowUpOutlined
                      onClick={() => {
                        upVote(reply);
                      }}
                    />
                  </div>
                  <div>
                    <ArrowDownOutlined onClick={() => downVote(reply)} />
                  </div>
                </Col>
                <Col span={22}>
                  <Badge.Ribbon
                    text={reply.upVotes === null || 0 ? 0 : reply.upVotes}
                    color="#f50"
                    placement="start"
                  >
                    <SyntaxHighlighter
                      lineProps={{
                        style: {
                          // wordBreak: "break-all",
                          whiteSpace: "pre-line",
                          // whiteSpace: "pre-wrap"
                        },
                      }}
                      customStyle={{
                        paddingLeft: "2em",
                        borderRadius: "5px",
                      }}
                      useInlineStyles={true}
                      wrapLines={true}
                      key={reply.id}
                      //   language={reply.codeType.toLowerCase()}
                      language="Javascript"
                      style={rainbow}
                    >
                      {reply.replyMessage}
                    </SyntaxHighlighter>
                  </Badge.Ribbon>
                  <h5 style={{ float: "left" }}>
                    Posted by: {reply.replyName}
                  </h5>
                  <Divider />
                </Col>
              </Row>
            </div>
          ))}
          <Collapse ghost>
            <Panel
              showArrow={false}
              key="1"
              extra={
                <Button
                  type="ghost"
                  onClick={() => {
                    replyOn();
                    addReply(post);
                    console.log(post.id);
                  }}
                >
                  Add Reply
                </Button>
              }
            >
              <CreateReply
                token={token}
                createReply={createReply}
                replyOff={replyOff}
                getPosts={getPosts}
              />
            </Panel>
          </Collapse>
        </Card>
      </Col>
    </Row>
  );
};

export default FeedCard;
