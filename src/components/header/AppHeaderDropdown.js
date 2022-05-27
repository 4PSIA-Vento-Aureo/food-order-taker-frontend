import { cilAccountLogout, cilSettings, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import React from "react";
import { useHistory } from "react-router-dom";

const AppHeaderDropdown = ({ auth }) => {
  const history = useHistory();
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <h6
          className={`m-0  d-flex align-items-center me-2 fw-bolder ${
            auth?.isAdmin === 1 ? "text-black" : "text-white"
          }`}
        >
          Hi, {auth?.name}
        </h6>
      </CDropdownToggle>
      <CDropdownMenu className="py-2" placement="bottom-end">
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem
          className="text-danger"
          onClick={() => {
            localStorage.clear("token");
            history.push("/home");
            window.location.reload(false);
          }}
        >
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
