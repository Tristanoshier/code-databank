import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { Spin } from "antd";
import { TokenContext } from "../../../../App";
import FeedDisplay from "../Home/Feed/FeedDisplay";

export const Popular = () => {
  const token = useContext(TokenContext);

  const [popularPosts, setPopularPosts] = useState([]);
  const [createReply, setCreateReply] = useState({});
  const [replyActive, setReplyActive] = useState(false);
  const [postActive, setPostActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(true);
  const [popularHasMore, setPopularHasMore] = useState(false);
  const [popularPageNumber, setPopularPageNumber] = useState(1);

  // infinite scroll is currently broken, this var can be toggled to turn it on and off for testing purposes 
  let useInfiniteScroll = false;

  useEffect(() => {
    if (useInfiniteScroll) getPopularPostsInfinite(true);
  }, [popularPageNumber]);

  useEffect(() => {
    if (!useInfiniteScroll) getPopularPosts(true);
  }, [])

  // since we are passing down diff fuctions as same prop, have to include scrolling even though its not being used
  const getPopularPosts = scrolling => {
    try {
      fetch(`http://localhost:3000/posts/popular`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: token
        })
      }).then(res => res.json())
        .then(postResults => {
          setPopularPosts(postResults);
          setLoading(false);
        });
    } catch (error) {
      console.log("error", error);
    }
  }
  
  const getPopularPostsInfinite = scrolling => {
    popularPageNumber <= 1 ? setInfiniteScrollLoading(false) : setInfiniteScrollLoading(true);
    try {
      fetch(`http://localhost:3000/posts/popular/infinite?page=${popularPageNumber}&limit=10`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: token
        })
      }).then(res => res.json())
        .then(postResults => {
          if (scrolling) {
            setPopularPosts(prevPosts => {
              return [...prevPosts, ...postResults]
            });
            setPopularHasMore(postResults.length > 0);
          } else {
            setPopularPosts(postResults);
          }
          setLoading(false);
          setInfiniteScrollLoading(false);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const observer = useRef();

  const lastPopularPostOnScreen = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && popularHasMore) {
            setPopularPageNumber(prevPageNumber => prevPageNumber + 1);
        }
    })
    if (node) observer.current.observe(node)
}, [loading, popularHasMore])

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
          posts={popularPosts}
          replyActive={replyActive}
          postActive={postActive}
          addPost={addPost}
          postOn={postOn}
          postOff={postOff}
          createReply={createReply}
          addReply={addReply}
          replyOn={replyOn}
          replyOff={replyOff}
          getPosts={useInfiniteScroll ? getPopularPostsInfinite : getPopularPosts}
          lastPostOnScreen={lastPopularPostOnScreen}
          isPopularPage={true}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};
