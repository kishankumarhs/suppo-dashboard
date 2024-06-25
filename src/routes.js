// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import Banners from "layouts/banners";
import Songs from "layouts/songs";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    protected: true,
    showInNav: true,
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    protected: true,
    showInNav: true,
    icon: <Icon fontSize="small">group</Icon>,
    route: "/users",
    component: <Tables />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   protected: true,
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  {
    type: "collapse",
    name: "Banners",
    key: "banners",
    protected: true,
    showInNav: true,
    icon: <Icon fontSize="small">image</Icon>,
    route: "/banners",
    component: <Banners />,
  },
  {
    type: "collapse",
    name: "Songs & Playlists",
    key: "songs",
    protected: true,
    showInNav: true,
    icon: <Icon fontSize="small">music_note</Icon>,
    route: "/songs",
    component: <Songs />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    protected: true,
    showInNav: true,
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    showInNav: false,
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    showInNav: false,
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
