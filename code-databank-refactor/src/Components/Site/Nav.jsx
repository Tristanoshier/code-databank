import React, { useState, useContext } from "react";
import { TokenContext } from "../../App";
import { Link as RouterLink } from "react-router-dom";
import { Anchor, Drawer, Button } from "antd";
import mobileShield from "./assets/mobile-shield.png";

const { Link } = Anchor;

const Nav = ({ clickLogout }) => {
  const token = useContext(TokenContext);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="routing">
      <div className="container-fluid">
        <div className="header">
          <div className="logo">
            <RouterLink to="/">
              <img
                src={mobileShield}
                alt=""
                height="25px"
                style={{ borderRadius: "50%", marginRight: "5px" }}
              />
              Code Databank
            </RouterLink>
          </div>
          <div className="mobileHidden">
            <Anchor targetOffset="65">
              <RouterLink to="/" className="ant-anchor-link" onClick={onClose}>
                Dashboard
              </RouterLink>
              <RouterLink
                to="/popular"
                className="ant-anchor-link"
                onClick={onClose}
              >
                Popular
              </RouterLink>
              {token && (
                <RouterLink
                  to="/profile"
                  className="ant-anchor-link"
                  onClick={onClose}
                >
                  Profile
                </RouterLink>
              )}
              <RouterLink
                to="/search"
                className="ant-anchor-link"
                onClick={onClose}
              >
                Search
              </RouterLink>
              {token && (
                <RouterLink
                  to="/"
                  className="ant-anchor-link"
                  onClick={() => {
                    clickLogout();
                    onClose();
                  }}
                >
                  Logout
                </RouterLink>
              )}
            </Anchor>
          </div>
          <div className="mobileVisible">
            <Button type="primary" onClick={showDrawer}>
              <i className="fas fa-bars"></i>
            </Button>
            <Drawer
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
              <Anchor targetOffset="65">
                <RouterLink
                  to="/"
                  className="ant-anchor-link"
                  onClick={onClose}
                >
                  Dashboard
                </RouterLink>
                <RouterLink
                  to="/popular"
                  className="ant-anchor-link"
                  onClick={onClose}
                >
                  Popular
                </RouterLink>
                {token && (
                  <RouterLink
                    to="/profile"
                    className="ant-anchor-link"
                    onClick={onClose}
                  >
                    Profile
                  </RouterLink>
                )}
                <RouterLink
                  to="/search"
                  className="ant-anchor-link"
                  onClick={onClose}
                >
                  Search
                </RouterLink>
                {token && (
                  <RouterLink
                    to="/"
                    className="ant-anchor-link"
                    onClick={() => {
                      clickLogout();
                      onClose();
                    }}
                  >
                    Logout
                  </RouterLink>
                )}
              </Anchor>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Nav;
