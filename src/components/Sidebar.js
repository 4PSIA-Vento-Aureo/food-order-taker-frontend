import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
// sidebar nav config
import navigation from "../_nav";
import { AppSidebarNav } from "./AppSidebarNav";

import Logo from "../assets/brand/jerry-cafe-white.png";
import { Image } from "react-bootstrap";

const Sidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      className="sidebar"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <div className="sidebar-brand-full mx-3">
          <Image src={Logo} height={64} alt="logo" />
        </div>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  );
};

export default React.memo(Sidebar);
