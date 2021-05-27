import React, { useContext } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FeedIndex from "../Feed/FeedIndex";
import Nav from "./Nav";
import ViewPost from "../Feed/ViewPost";
import FeedIndexProvider from "../Feed/FeedIndex";
import FeedDisplayProvider from "../Feed/FeedDisplay";
import FeedCardProvider from "../Feed/FeedCard";

const { Header, Content } = Layout;

const MainLayout = ({ clickLogout, firstName }) => {
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
              <FeedIndexProvider>
                <FeedDisplayProvider>
                  <FeedCardProvider>
                    <ViewPost>
                      <Switch>
                        <Route exact path="/">
                          <FeedIndex firstName={firstName} />
                        </Route>
                        {/* <Route exact path="/post" component={ViewPost} /> */}
                        <Route exact path="/post">
                          <ViewPost />
                        </Route>
                      </Switch>
                    </ViewPost>
                  </FeedCardProvider>
                </FeedDisplayProvider>
              </FeedIndexProvider>
            </div>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default MainLayout;
