import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { SOCKET_URL } from "src/client/clientConfig/clientConstants";

import NavigationBar from "src/client/components/navigation/navigationBar";
import Loader from "src/client/components/commons/loader";
import AlertPopup from "src/client/components/navigation/alertPopup";
import { syncUser } from "src/client/redux/authorization/thunk";
import ProjectSetup from "src/client/components/projectSetup";
import { PATH_NAMES } from "src/client/clientConfig/clientConstants";

const AUTHORIZED_PATH = [];
const PREAUTH_PATH = [...Object.values(PATH_NAMES.preAuthPath)];

const NavigationHelper = (props) => {
  const { Component, ...pageProps } = props;
  const router = useRouter();
  const { pathname } = router;
  const [socket, setSocket] = React.useState(null);
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn, email } = auth;
  const installBtnRef = useRef(null);
  const dispatch = useDispatch();
  const deferredPrompt = useRef(null);
  const [isAppInstalled, setAppInstalled] = useState(true);

  // use effect for install pwa
  React.useEffect(() => {
    const setDeferredPrompt = (e) => {
      // this function will not be called if the user has already installed app
      deferredPrompt.current = e;
      if (isAppInstalled) {
        setAppInstalled(false);
      }
    };

    window.addEventListener("beforeinstallprompt", setDeferredPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", setDeferredPrompt);
    };
  }, []);

  // use effect for socket initialization
  React.useEffect(() => {
    if (email === null) return;
    console.log("syncing...", email);
    // sync the app
    dispatch(syncUser(email));
    socketInitializer();
  }, [email]);

  // use effect for socket connection to unique channel
  React.useEffect(() => {
    if (socket === null) return;
    if (email === null) return;
    // join channel for individual email id
    socket.on("connect", () => {
      socket.emit("join", { email: email });
    });

    return () => {
      socket?.close();
    };
  }, [socket, email]);

  // useEffect for route handling
  React.useEffect(() => {
    if (!router.isReady) return;
    // user not logged in and tries accessing authorized path
    if (!isLoggedIn && !PREAUTH_PATH.includes(pathname)) {
      setTimeout(() => {
        navigateToPath(PATH_NAMES.preAuthPath.home);
      }, 700);
      return;
    }

    // user logged in but tries accesing preauth path
    if (isLoggedIn && PREAUTH_PATH.includes(pathname)) {
      setTimeout(() => {
        navigateToPath(PATH_NAMES.postAuthPath.home);
      }, 700);
      return;
    }
  }, [router.isReady, isLoggedIn, pathname]);

  const socketInitializer = async () => {
    await fetch(SOCKET_URL);
    const newSocket = io();
    setSocket(newSocket);
  };

  const navigateToPath = (path) => {
    router.push(path);
  };

  const onClickInstallApp = async () => {
    if (deferredPrompt.current !== null) {
      deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      if (outcome === "accepted") {
        installBtnRef.current.style.display = "none";
        console.log("installing app");
      }
    }
  };

  // console.log(isLoggedIn);
  if (isLoggedIn === null) {
    // dom has not initialized
    return <Loader />;
  }
  if (!isLoggedIn && !PREAUTH_PATH.includes(pathname)) {
    // user not logged in and tries accessing authorized path
    return null;
  }
  if (isLoggedIn && PREAUTH_PATH.includes(pathname)) {
    // user logged in but tries accesing preauth path
    return null;
  }
  // is user is in valid path then no need for computation
  return (
    <>
      <ProjectSetup router={router} />
      <NavigationBar isLoggedIn={isLoggedIn} pathname={pathname} />
      <AlertPopup />
      <Component {...pageProps} socket={socket} email={email} />
    </>
  );
};

export default NavigationHelper;
