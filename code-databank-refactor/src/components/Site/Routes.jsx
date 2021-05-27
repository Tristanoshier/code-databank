import React from 'react';
import { Switch, Route } from "react-router-dom";
import { FocusedPost } from "../Feed/FocusedPost";
import { Home } from "./Home";

export const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/focusedPost">
                <FocusedPost />
            </Route>
        </Switch>
    )
}