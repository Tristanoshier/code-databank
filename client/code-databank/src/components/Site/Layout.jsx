import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FeedIndex from "../Feed/FeedIndex";
import Nav from "./Nav";

const { Header, Content } = Layout;

const MainLayout = ({ clickLogout, token, firstName }) => {
  return (
    <Router>
      <Layout className="mainLayout">
        <Header>
          <Nav clickLogout={clickLogout} />
        </Header>
        <div className="spacer"></div>
        <Content>
          <div className="container-fluid">
            <div className="content">
              <Switch>
                <Route exact path="/">
                  <FeedIndex token={token} firstName={firstName} />
                </Route>
                <Route exact path="/hours">
                  {/* <GetHours token={props.token} /> */}
                </Route>
              </Switch>
            </div>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default MainLayout;
