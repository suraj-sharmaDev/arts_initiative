import React from "react";
import * as style from "@dicebear/avatars-initials-sprites";
import styles from "./navigationBar.module.css";

import PreAuthNavbar from "./preAuthNavbar";
import PostAuthNavbar from "./postAuthNavbar";

const NavigationBar = ({ isLoggedIn, pathname, ...props }) => {
  if (isLoggedIn) return <PostAuthNavbar pathname={pathname} />;
  return <PreAuthNavbar pathname={pathname} />;
};

export default NavigationBar;
