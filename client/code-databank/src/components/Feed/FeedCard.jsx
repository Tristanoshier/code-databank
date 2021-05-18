import React, { useState } from "react";
import upVote from "../Fetches/Votes";
import SyntaxHighlighter from "react-syntax-highlighter";
import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Row, Col, Card, Collapse, Badge, Divider, Button, Form } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  UpOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import CreateReply from "../Fetches/CreateReply";

const { Panel } = Collapse;

const FeedCard = ({
  token,
  post,
  index,
  replyOn,
  replyOff,
  addReply,
  createReply,
}) => {
  const [posts, setPosts] = useState([]);
  const [upvoteCount, setUpvoteCount] = useState();

  return (
    <Row justif="center">
      <Col span={8}>
        <Card
          title={post.postTitle}
          style={{ width: 600, marginBottom: "40px", borderRadius: "5px" }}
        >
          <p>{post.postType}</p>
          {post.replies?.map((reply, index) => (
            <div>
              <Row justify="center" align="start">
                <Col span={2}>
                  <div>
                    <ArrowUpOutlined
                      onClick={() => {
                        upVote(reply, token, setUpvoteCount, setPosts);
                      }}
                    />
                  </div>
                  <div>
                    <ArrowDownOutlined onClick={() => downVoteReply(reply)} />
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
              />
            </Panel>
          </Collapse>
        </Card>
      </Col>
    </Row>
  );
};

export default FeedCard;
