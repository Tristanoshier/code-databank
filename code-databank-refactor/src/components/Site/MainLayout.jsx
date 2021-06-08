import React from "react";
import { Layout } from "antd";
import Nav from "./Nav";
import { Routes } from "./Routes";

const { Header, Content } = Layout;

const MainLayout = ({ clickLogout }) => {
  return (
    <Layout className="mainLayout">
      <Header>
        <Nav clickLogout={clickLogout} />
      </Header>
      <div className="spacer"></div>
      <Content>
        <div>
          <div className="container-fluid">
            <div className="content">
              <Routes />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
