import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
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
  
  // infinite scroll is currently broken, this var can be toggled to turn it on and off for testing purposes 
  let useInfiniteScroll = false;

  useEffect(() => {
    if (useInfiniteScroll) getPostsInfinite(true);
  }, [pageNumber]);

  useEffect(() => {
    if (!useInfiniteScroll) getPosts(true);
  }, [])

  // since we are passing down diff fuctions as same prop, have to include scrolling even though its not being used
  const getPosts = async (scrolling) => {
    try {
      await fetch(`http://localhost:3000/posts`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then((postResults) => {
         setPosts(postResults)
        })
        .then(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log("error", error);
    }
  }

  const getPostsInfinite = async (scrolling) => {
    pageNumber <= 1
      ? setInfiniteScrollLoading(false)
      : setInfiniteScrollLoading(true);

    if (scrolling === false) {
      setPageNumber(1);
    }

    try {
      await fetch(`http://localhost:3000/posts/infinite?page=${pageNumber}&limit=10`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then((postResults) => {
          if (scrolling) {
            setPosts((prevPosts) => {
              return [...prevPosts, ...postResults];
            });
            setHasMore(postResults.length > 0);
          } else {
            setPosts(postResults);
          }
        })
        .then(() => {
          setLoading(false);
          setInfiniteScrollLoading(false);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  // const getPosts = async (scrolling) => {
  //   pageNumber <= 1
  //     ? setInfiniteScrollLoading(false)
  //     : setInfiniteScrollLoading(true);

  //   if (scrolling === false) {
  //     setPageNumber(1);
  //   }

  //   const settings = {
  //     method: "GET",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     }),
  //   };
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/posts?page=${pageNumber}&limit=10`,
  //       settings
  //     );
  //     const data = await response.json();
  //     if (scrolling) {
  //       setPosts((prevPosts) => {
  //         return [...prevPosts, ...data];
  //       });
  //       setHasMore(data.length > 0);
  //     } else {
  //       setPosts(data);
  //     }
  //     console.log(data);
  //     setLoading(false);
  //     setInfiniteScrollLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const observer = useRef();

  const lastPostOnScreen = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

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
          loading={loading}
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
          getPosts={useInfiniteScroll ? getPostsInfinite : getPosts}
          lastPostOnScreen={lastPostOnScreen}
          isPopularPage={false}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default FeedIndex;
