import React from "react";
import { Switch, Route } from "react-router-dom";
import FocusedPost from "./Pages/Home/Feed/FocusedPost";
import ProfileIndex from "../Profile/ProfileIndex";
import { Home } from "./Pages/Home/Home";
import { Popular } from "./Pages/Popular/Popular";
import { Search } from "./Pages/Search/Search";

export const Routes = () => {
  return (
    <Switch>
      {/* Dashboard */}
      <Route exact path="/">
        <Home />
      </Route>
      {/* Popular */}
      <Route exact path="/popular">
        <Popular />
      </Route>
      {/* Search */}
      <Route exact path="/search">
        <Search />
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
