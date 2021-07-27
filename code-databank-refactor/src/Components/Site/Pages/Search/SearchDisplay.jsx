import React, { useState } from 'react'
import FeedDisplay from '../Home/Feed/FeedDisplay'

export const SearchDisplay = ({ posts, getPosts }) => {
    const [createReply, setCreateReply] = useState({});
    const [replyActive, setReplyActive] = useState(false);
    const [postActive, setPostActive] = useState(false);

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
                isPopularPage={true}
            />
        </div>
    )
}
