import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Anchor, Drawer, Button } from "antd";

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
              src="https://elevenfifty.org/wp-content/uploads/2019/03/mobile-shield.png"
              alt=""
              height="25px"
              style={{ borderRadius: "50%", marginRight: "5px" }}
            />
            <a href="https://google.com">EFA</a>
          </div>
          <div className="mobileHidden">
            <Anchor targetOffset="65">
              <Link href="/" title="Home" />

              <Link href="https://learninggym-3a62e.web.app/" title="LG" />
              <Link href="https://www.office.com/" title="Office" />
              <Link
                href="https://elevenfiftyacademy-my.sharepoint.com/:x:/r/personal/hcurry_elevenfifty_org/_layouts/15/Doc.aspx?sourcedoc=%7BD90C7781-6FA3-4BF3-8D35-2BEEFF2BE24B%7D&file=Instructor%20%26%20LA%20Assignments.xlsx&action=default&mobileredirect=true"
                title="Assignments"
              />
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
                <Link href="/" title="Home" />

                <Link href="https://learninggym-3a62e.web.app/" title="LG" />
                <Link href="https://www.office.com/" title="Office" />
                <Link
                  href="https://elevenfiftyacademy-my.sharepoint.com/:x:/r/personal/hcurry_elevenfifty_org/_layouts/15/Doc.aspx?sourcedoc=%7BD90C7781-6FA3-4BF3-8D35-2BEEFF2BE24B%7D&file=Instructor%20%26%20LA%20Assignments.xlsx&action=default&mobileredirect=true"
                  title="Assignments"
                />
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
