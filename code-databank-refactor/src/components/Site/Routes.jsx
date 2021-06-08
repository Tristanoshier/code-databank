import React from "react";
import { Switch, Route } from "react-router-dom";
import { Search } from "./Pages/Search/Search";
import { Popular } from "./Pages/Popular/Popular";
import FocusedPost from "./Pages/Home/Feed/FocusedPost";
import { Home } from "./Pages/Home/Home";

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
    </Switch>
  );
};
