import Dashboard from "./views/pages/adminDashboard/AdminDashboard";
import Category from "./views/pages/category/Category";
import Menu from "./views/pages/menu/Menu";
import Order from "./views/pages/order/Order";
import OrderDetail from "./views/pages/order/OrderDetail";

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/order/:id", name: "Order Detail", component: OrderDetail },
  { path: "/order", name: "Order", component: Order },
  { path: "/category", name: "Category", component: Category },
  { path: "/menu", name: "Menu", component: Menu },
];

export default routes;
