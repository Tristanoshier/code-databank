import React from "react";
import FeedIndexProvider from "../Feed/FeedIndex";
import FeedDisplayProvider from "../Feed/FeedDisplay";
import FeedCardProvider from "../Feed/FeedCard";
import FocusedPost from "../Feed/FocusedPost";

export const Home = () => {
  return (
    <FeedIndexProvider>
      <FeedDisplayProvider>
        <FeedCardProvider>
          <FocusedPost></FocusedPost>
        </FeedCardProvider>
      </FeedDisplayProvider>
    </FeedIndexProvider>
  );
};
