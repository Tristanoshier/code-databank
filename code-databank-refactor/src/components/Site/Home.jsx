import React from 'react';
import ViewPost from "../Feed/ViewPost";
import FeedIndexProvider from "../Feed/FeedIndex";
import FeedDisplayProvider from "../Feed/FeedDisplay";
import FeedCardProvider from "../Feed/FeedCard";

export const Home = () => {
    return (
        <div>
          <div className="container-fluid">
            <div className="content">
              <FeedIndexProvider>
                <FeedDisplayProvider>
                  <FeedCardProvider>
                    <ViewPost>
                    </ViewPost>
                  </FeedCardProvider>
                </FeedDisplayProvider>
              </FeedIndexProvider>
            </div>
          </div>
        </div>
    )
}
