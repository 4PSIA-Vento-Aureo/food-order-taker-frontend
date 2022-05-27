import { cilFastfood } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CContainer, CHeader, CHeaderNav } from "@coreui/react";
import React from "react";
import { AppHeaderDropdown } from "./header/index";
import Logo from "../assets/brand/jerry-cafe-white.png";
import { Image } from "react-bootstrap";

const AppNavbar = ({ auth }) => {
  return (
    <CHeader position="sticky" className="app-navbar">
      <CContainer fluid>
        {/* <div className="row"> */}
        {/* <div className="col">
            <CIcon icon={cibInstagram} />
          </div>
          <div className="col">
            <CIcon icon={cibPinterestP} />
          </div>
          <div className="col">
            <CIcon icon={cibFacebookF} />
          </div> */}
        {/* </div> */}
        <div className="d-flex justify-content-between align-items-center  w-100">
          <div className="h5">
            <Image src={Logo} height={64} alt="logo" />
          </div>
          <div className="fs3">
            <CIcon icon={cilFastfood} />
          </div>
          <CHeaderNav>
            <AppHeaderDropdown auth={auth} />
          </CHeaderNav>
        </div>
        {/* <div className="row"> */}
        {/* <div className="col">
            <CIcon icon={cilSearch} />
          </div>
          <div className="col">
            <CIcon icon={cilUser} />
          </div>
          <div className="col">
            <CIcon icon={cilCart} />
          </div> */}

        {/* </div> */}
      </CContainer>
    </CHeader>
  );
};

export default AppNavbar;
