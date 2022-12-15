import React from "react";
import styles from "./button.module.css";

const LoginButton = ({
  title,
  isActive = false,
  disabled = false,
  callback = () => {},
}) => {
  const classNames = isActive ? "btn-primary" : "";
  return (
    <button
      className={`btn ${classNames} ${styles.loginBtn}`}
      onClick={callback}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default LoginButton;
