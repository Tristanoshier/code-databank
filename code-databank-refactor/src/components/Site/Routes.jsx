import React from "react";
import { Switch, Route } from "react-router-dom";
import FocusedPost from "../Feed/FocusedPost";
import ProfileIndex from "../Profile/ProfileIndex";
import { Home } from "./Home";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/focusedPost/:post">
        <FocusedPost />
      </Route>
      <Route exact path="/profile">
        <ProfileIndex />
      </Route>
    </Switch>
  );
};
