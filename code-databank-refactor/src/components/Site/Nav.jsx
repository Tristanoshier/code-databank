import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Anchor, Drawer, Button } from "antd";
import mobileShield from "./assets/mobile-shield.png";

const { Link } = Anchor;

const Nav = ({ clickLogout }) => {
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
            <img
              src={mobileShield}
              alt=""
              height="25px"
              style={{ borderRadius: "50%", marginRight: "5px" }}
            />
            <a href="https://google.com">EFA</a>
          </div>
          <div className="mobileHidden">
            <Anchor targetOffset="65">
              <RouterLink to="/">
                <Link href="/" title="Home" />
              </RouterLink>
              <RouterLink to="/">
                <a onClick={clickLogout}>
                  <Link href="/" title="Logout" />
                </a>
              </RouterLink>
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
                <RouterLink to="/">
                  <Link href="/" title="Home" />
                </RouterLink>
                <RouterLink to="/">
                  <a onClick={clickLogout}>
                    <Link href="#" title="Logout" />
                  </a>
                </RouterLink>
              </Anchor>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Nav;
