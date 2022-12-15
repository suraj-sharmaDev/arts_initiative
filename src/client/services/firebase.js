import React, { useEffect } from "react";
import "firebase/messaging";
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { getRemoteConfig } from "firebase/remote-config";
import { useSelector, useDispatch } from "react-redux";

import { firebaseConfig, firebaseKeyPair } from "src/server/serverConfig/firebaseConstants";
import { updateToken } from "src/client/redux/firebase/thunk";

const useFirebaseMessaging = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { email } = auth;
  const firebaseState = useSelector((state) => state.firebase);
  const [isFetching, setFetching] = React.useState(true);
  const [token, setToken] = React.useState(null);
  const [firebaseApp, setFirebaseApp] = React.useState(null);
  const [messaging, setMessaging] = React.useState(null);
  const [remoteConfig, setRemoteConfig] = React.useState(null);

  useEffect(() => {
    // else initialize
    initializeFireBase();
  }, []);

  const initializeFireBase = async () => {
    if (token != null) return;
    const firebaseApp = initializeApp(firebaseConfig);;
    const messaging = getMessaging(firebaseApp);
    const remoteConfig = getRemoteConfig(firebaseApp);
    // update every 1 minutes
    remoteConfig.settings.minimumFetchIntervalMillis = 60000;
    remoteConfig.defaultConfig = {
      appVersion: "1.0",
    };

    const status = await Notification.requestPermission();
    if (status && status === "granted") {
      let reduxToken = firebaseState?.fcmToken;
      let getFirebaseToken = await getToken(messaging, {
        vapidKey: firebaseKeyPair,
      });
      // if we already have stored fcmToken
      if (
        reduxToken == null ||
        (getFirebaseToken && getFirebaseToken != reduxToken)
      ) {
        dispatch(updateToken({ email, token: getFirebaseToken }));
      }
      setFetching(false);
      setToken(getFirebaseToken);
      setFirebaseApp(firebaseApp);
      setMessaging(messaging);
      setRemoteConfig(remoteConfig);
    }
  };

  return { isFetching, token, firebaseApp, messaging, email, remoteConfig };
};

export { useFirebaseMessaging };
