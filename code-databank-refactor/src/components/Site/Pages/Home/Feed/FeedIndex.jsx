import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { Spin } from "antd";
import { TokenContext } from "../../../../../App";
import FeedDisplay from "./FeedDisplay";

const FeedIndex = () => {
  const token = useContext(TokenContext);

  const [posts, setPosts] = useState([]);
  const [createReply, setCreateReply] = useState({});
  const [replyActive, setReplyActive] = useState(false);
  const [postActive, setPostActive] = useState(false);
  const [createPost, setCreatePost] = useState({});
  const [loading, setLoading] = useState(true);
  const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [showGetStarted, setShowGetStarted] = useState(false);

  useEffect(() => {
    getPosts(true);
  }, [pageNumber]);
  
  const getPosts = scrolling => {
    pageNumber <= 1 ? setInfiniteScrollLoading(false) : setInfiniteScrollLoading(true);
    try {
      fetch(`http://localhost:3000/posts?page=${pageNumber}&limit=10`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: token
        })
      }).then(res => res.json())
        .then(postResults => {
          if (scrolling) {
            setPosts(prevPosts => {
              return [...prevPosts, ...postResults]
            });
            setHasMore(postResults.length > 0);
          } else {
            setPosts(postResults);
          }
          setLoading(false);
          setInfiniteScrollLoading(false);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const observer = useRef();

  const lastPostOnScreen = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
    })
    if (node) observer.current.observe(node)
}, [loading, hasMore])

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

  return (
    <div>
      {!loading || !infiniteScrollLoading ? (
        <FeedDisplay
          posts={posts}
          replyActive={replyActive}
          postActive={postActive}
          addPost={addPost}
          postOn={postOn}
          postOff={postOff}
          createReply={createReply}
          addReply={addReply}
          replyOn={replyOn}
          replyOff={replyOff}
          getPosts={getPosts}
          lastPostOnScreen={lastPostOnScreen}
          showGetStarted={showGetStarted}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default FeedIndex;
