import React from "react";
import { Switch, Route } from "react-router-dom";
import FocusedPost from "../Feed/FocusedPost";
import { Home } from "./Home";
import FeedIndexProvider from "../Feed/FeedIndex";
import FeedDisplayProvider from "../Feed/FeedDisplay";
import FeedCardProvider from "../Feed/FeedCard";

export const Routes = () => {
  return (
    <FeedIndexProvider>
      <FeedDisplayProvider>
        <FeedCardProvider>
          <div>
            <div className="container-fluid">
              <div className="content">
                <Switch>
                  <Route exact path="/">
                    {/* <Home /> */}
                  </Route>
                  <Route exact path="/focusedPost/:post">
                    <FocusedPost />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </FeedCardProvider>
      </FeedDisplayProvider>
    </FeedIndexProvider>
  );
};
