import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "src/client/redux/authorization/reducer";
import { resetOnBoarding } from "src/client/redux/onboarding/reducer";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-initials-sprites";

import styles from "./navigationBar.module.css";
import { PATH_NAMES } from "src/client/clientConfig/clientConstants";

export const DrawerSideBar = ({
  setRef,
  email,
  setInstallBtnRef,
  isAppInstalled,
  onClickInstallApp,
  ...props
}) => {
  const authData = useSelector((state) => state.auth);
  const { userData } = authData;

  const isAdmin = userData?.user?.role == "admin";
  const openAIKeys = userData?.openAIKeys;
  // this is to identify if user is admin or sub user
  // only admin has key
  const openAISelfStoredKeyObject = openAIKeys?.selfStoredKeys?.[0];
  const openAIKeyId = openAISelfStoredKeyObject?._id;

  let svg = createAvatar(style, {
    seed: email,
    dataUri: true,
    // ... and other options
  });

  const drawerRef = React.useRef(null);
  const appVersion = userData?.appVersion;

  const localRefSetter = (ref) => {
    drawerRef.current = ref;
    setRef(ref);
  };

  const hideDrawer = () => {
    drawerRef.current.classList.remove(styles.showDrawer);
  };

  const renderInstallAppBtn = () => {
    if (isAppInstalled) return null;
    return (
      <button
        ref={setInstallBtnRef}
        onClick={onClickInstallApp}
        className="btn btn-primary btn-sm"
      >
        Install App
      </button>
    );
  };

  return (
    <>
      <div className={`${styles.drawerSideBar}`} ref={localRefSetter}>
        <div className="container px-4 w-100 h-100" style={{ zIndex: 999 }}>
          <div className={styles.avatarContainer}>
            <img src={svg} />
            <p>Hi, {email.split("@")[0]}!</p>
          </div>
          <Link href="/user">
            <p>
              <i className="bi bi-house"></i> Home
            </p>
          </Link>
          <Link href="/user/userUploads">
            <p>
              <i className="bi bi-music-player"></i> Recordings
            </p>
          </Link>
          <Link href="/user/settings">
            <p>
              <i className="bi bi-gear"></i> Settings
            </p>
          </Link>
          {openAIKeyId && isAdmin && (
            <Link href="/user/invite">
              <p>
                <i className="bi bi-people"></i> Invite
              </p>
            </Link>
          )}
          <div className={styles.appVersionDiv}>
            {renderInstallAppBtn()}
            <span>Version {appVersion}</span>
          </div>
        </div>

        <div
          className={`d-md-none d-block ${styles.closeDrawerFakeDiv}`}
          onClick={hideDrawer}
        ></div>
      </div>
    </>
  );
};

const NavigationBar = ({ toggleDrawer, ...props }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    dispatch(resetOnBoarding());
  };

  return (
    <div className={`px-4 ${styles.topNavBarContainer}`}>
      <nav className="navbar navbar-light justify-content-between">
        {props.isLoggedIn && (
          <button
            onClick={toggleDrawer}
            className={`d-md-none d-block ${styles.drawerMenuBtn}`}
          >
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        )}
        <Link href={props.isLoggedIn ? "/user" : "/"}>
          <a className={`px-2 ${styles.brandText}`}>Protoflow</a>
        </Link>
        <form className="form-inline">
          {props.isLoggedIn && (
            <button
              onClick={logoutHandler}
              className="btn btn-outline-danger my-2 my-sm-0"
              type="button"
            >
              Logout
            </button>
          )}
        </form>
      </nav>
    </div>
  );
};

export default NavigationBar;
