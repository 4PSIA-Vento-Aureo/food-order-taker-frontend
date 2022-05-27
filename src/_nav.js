import {
  cilChartPie,
  cilPeople,
  cilMenu,
  cilMoney,
  cilRestaurant,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavItem } from "@coreui/react";
import React from "react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Order",
    to: "/order",
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Category",
    to: "/category",
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Menu",
    to: "/menu",
    icon: <CIcon icon={cilRestaurant} customClassName="nav-icon" />,
  },
];

export default _nav;
