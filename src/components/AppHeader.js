import { cilMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
} from "@coreui/react";
import React from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import logo from "src/assets/brand/jerry-cafe-white.png";
import { AppHeaderDropdown } from "./header/index";

const AppHeader = ({ auth }) => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CHeader position="sticky" className="mb-4 navbar">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <Image src={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav>
          <AppHeaderDropdown auth={auth} />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
