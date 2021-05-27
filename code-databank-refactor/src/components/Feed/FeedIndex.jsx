import React, { useState, useEffect, useContext } from "react";
import { Spin } from "antd";
import axios from "axios";
import { TokenContext } from "../../App";

export const PostsContext = React.createContext();
export const GetPostsContext = React.createContext();
export const CreateReplyContext = React.createContext();
export const ReplyActiveContext = React.createContext();
export const PostActiveContext = React.createContext();
export const CreatePostContext = React.createContext();
export const AddPostContext = React.createContext();
export const PostOnContext = React.createContext();
export const PostOffContext = React.createContext();
export const AddReplyContext = React.createContext();
export const ReplyOnContext = React.createContext();
export const ReplyOffContext = React.createContext();

const FeedIndex = (props) => {
  const token = useContext(TokenContext);

  const [posts, setPosts] = useState([]);
  const [createReply, setCreateReply] = useState({});
  const [replyActive, setReplyActive] = useState(false);
  const [postActive, setPostActive] = useState(false);
  const [createPost, setCreatePost] = useState({});
  const [loading, setLoading] = useState(false);

  // main GET fetch
  const getPosts = async () => {
    try {
      const data = await axios
        .get("http://localhost:3000/posts", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setPosts(res.data);
        });
      setLoading(true);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  // post actives
  const addPost = (post) => {
    setCreatePost(post);
  };

  const postOn = () => {
    setPostActive(true);
  };

  const postOff = () => {
    setPostActive(false);
  };

  // reply actives
  const addReply = (reply) => {
    setCreateReply(reply);
  };

  const replyOn = () => {
    setReplyActive(true);
  };

  const replyOff = () => {
    setReplyActive(!replyActive);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <GetPostsContext.Provider value={getPosts}>
      <PostsContext.Provider value={posts}>
        <CreateReplyContext.Provider value={createReply}>
          <ReplyActiveContext.Provider value={replyActive}>
            <PostActiveContext.Provider value={postActive}>
              <CreatePostContext.Provider value={createPost}>
                <AddPostContext.Provider value={addPost}>
                  <PostOnContext.Provider value={postOn}>
                    <PostOffContext.Provider value={postOff}>
                      <AddReplyContext.Provider value={addReply}>
                        <ReplyOnContext.Provider value={replyOn}>
                          <ReplyOffContext.Provider value={replyOff}>
                            {loading ? props.children : <Spin />}
                          </ReplyOffContext.Provider>
                        </ReplyOnContext.Provider>
                      </AddReplyContext.Provider>
                    </PostOffContext.Provider>
                  </PostOnContext.Provider>
                </AddPostContext.Provider>
              </CreatePostContext.Provider>
            </PostActiveContext.Provider>
          </ReplyActiveContext.Provider>
        </CreateReplyContext.Provider>
      </PostsContext.Provider>
    </GetPostsContext.Provider>
  );
};

export default FeedIndex;
