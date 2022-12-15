import React, { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import {toast} from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { syncUser } from "src/client/redux/authorization/thunk";
import { useFirebaseMessaging } from "src/client/services/firebase";
import { rebuildProjectApi } from "src/client/services/rebuildProject";
import styles from "./pushNotificationLayout.module.css";


const PushNotificationLayout = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, messaging, email, remoteConfig } = useFirebaseMessaging();
  // this will store firebase notification data
  const [messageData, setMessageData] = React.useState(null);
  const [showNotification, setShowNotification] = React.useState(false);
  // if notification doesnt contain action in payload.data then it will be stored
  // in updatesData
  const [updatesData, setUpdatesData] = React.useState([]);
  const [samePageActionEnabled, setSamePageActionEnabled] = React.useState(false);
  const updateBodyRef = React.useRef(null);
  const authData = useSelector((state) => state.auth);
  const { userData, responseStatus } = authData;

  const isAdmin = userData?.user?.role == "admin";
  const appVersion = userData?.appVersion;

  React.useEffect(() => {
    if (token) {
      getMessages();
      // Event listener that listens for the push notification event in the background
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.addEventListener("message", (event) => {
          // console.log("event for the service worker", event);
        });
      }
    }
  }, [token]);

  React.useEffect(()=>{
    // only enter once sync is completed
    if (responseStatus == "pending") return;
    if (token == null) return;
      // this is for updating the app version and only
      // admin should be able to do this
      if (isAdmin) {
        // this timeout is required so that app sync call occurs before we check for update
        fetchFirebaseConfigurations();
      }
  }, [responseStatus, token])

  React.useEffect(() => {
    if (messageData == null) return;
    setShowNotification(true);
  }, [messageData]);

  const fetchFirebaseConfigurations = async() => {
    /**
     * TODO: This will be replaced with admin api calls on later stages
     */
    try {
      const isFetched = await fetchAndActivate(remoteConfig);
      const value = getValue(remoteConfig, "appVersion");
      console.log("available app version : ", value?._value, appVersion);
      if (value?._value > appVersion) {
        setMessageData({
          title: "Update Available",
          message: `Version ${value?._value} has been released and is available for downloads`,
          action: {
            positive: {
              text: "Update",
              type: "build",
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getMessages = () => {

    onMessage(messaging, (payload) => {
      // logic for payload which trigger an action
      if (payload?.data?.actions) {
        const parsedActions = JSON.parse(payload?.data?.actions);
        const { title, body } = payload?.notification;
        setMessageData({
          title,
          message: body,
          action: parsedActions,
        });
        console.log(payload);
        return;
      }
      // logic for payload which are basically updates with no action
      // just for displaying
      if (payload?.data?.updates) {
        const data = payload?.data?.updates;
        setUpdatesData((prevData) => [...prevData, data]);
        if (updateBodyRef?.current) {
          updateBodyRef?.current.scrollIntoView({ behavior: 'smooth' })
        }
      }
    });
  };

  const onPressModalCloseBtn = () => {
    setShowNotification(false);
    setMessageData(null);
    setUpdatesData([]);
    setSamePageActionEnabled(false);
  };

  const onPressNotificationActionHandler = async (actionType) => {
    const actionContext = messageData?.action?.[actionType];
    const { type, url } = actionContext;
    if (type == "api") {
      console.log("call api");
      return;
    }
    if (type == "route") {
      navigateToPath(url);
      return;
    }
    if (type == "build") {
      setSamePageActionEnabled(true);
      const response = await rebuildProjectApi(email);
      // when api call is done
      if (response.error == false) {
        // project build successful
        dispatch(syncUser(email));
        toast.success("Project build successful!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        setTimeout(() => {
          // reload current route
          router.reload(window.location.pathname);
          onPressModalCloseBtn();
        }, 5000);
      } else {
        // project build failed
        toast.error("Project build failed!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });
        setTimeout(() => {
          onPressModalCloseBtn();
        }, 3000);
      }
      return;
    }
  };

  const navigateToPath = (url) => {
    setShowNotification(false);
    setMessageData(null);
    router.push(`/user${url}`);
  };

  const renderBodyForModal = () => {
    return (
      <>
        <div className="text-center">
          <h4>{messageData?.title}</h4>
          <span>{messageData?.message}</span>
        </div>
        {
          samePageActionEnabled && (
            <div className={styles.displayBuildStatus}>
              {
                updatesData.map((d, idx) => {
                  return (
                    <div key={idx.toString()}>
                    <span>{d}</span>
                  </div>
                  )
                })
              }
              <div ref={updateBodyRef} />
            </div>
          )
        }
      </>
    );
  };

  const renderFooterForModal = () => {
    if (samePageActionEnabled) return null;
    return (
      <div className="d-flex justify-content-around w-100">
        {messageData?.action ? (
          <>
            {messageData?.action?.positive && (
              <button
                className="btn btn-success w-25"
                onClick={() => onPressNotificationActionHandler("positive")}
              >
                {messageData?.action?.positive?.text}
              </button>
            )}
            {messageData?.action?.negative ? (
              <button
                className="btn btn-danger w-25"
                onClick={() => onPressNotificationActionHandler("negative")}
              >
                {messageData?.action?.negative?.text}
              </button>
            ) : (
              <button
                className="btn btn-danger w-25"
                onClick={onPressModalCloseBtn}
              >
                Later
              </button>
            )}
          </>
        ) : (
          <button
            className="btn btn-danger w-25"
            onClick={onPressModalCloseBtn}
          >
            Later
          </button>
        )}
      </div>
    );
  };

  return (
    <Modal show={showNotification} centered>
      <Modal.Body>{renderBodyForModal()}</Modal.Body>
      <Modal.Footer>{renderFooterForModal()}</Modal.Footer>
    </Modal>
  );
};

export default PushNotificationLayout;
