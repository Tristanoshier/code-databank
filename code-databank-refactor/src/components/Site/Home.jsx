import React from 'react';
import FeedIndexProvider from "../Feed/FeedIndex";
import FeedDisplayProvider from "../Feed/FeedDisplay";
import FeedCardProvider from "../Feed/FeedCard";
import FocusedPost from '../Feed/FocusedPost';

export const Home = () => {
    return (
        <div>
          <div className="container-fluid">
            <div className="content">
              <FeedIndexProvider>
                <FeedDisplayProvider>
                  <FeedCardProvider>
                    <FocusedPost>
                    </FocusedPost>
                  </FeedCardProvider>
                </FeedDisplayProvider>
              </FeedIndexProvider>
            </div>
          </div>
        </div>
    )
}
