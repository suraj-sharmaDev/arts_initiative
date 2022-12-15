import React from "react";
import Loader from "src/client/components/commons/loader";
import { isUrlIpAddress, isValidUrl } from "src/client/helpers/commonFunctions";
import styles from "./ProjectDomain.module.css";

const Messages = [
  "Creating domain configuration file",
  "Creating symbolic link of the configuration",
  "Restarting web server",
  "Generating domain certificate",
  "Everything looks good, please wait!",
];

const ProjectSetup = ({ router, ...props }) => {
  const [domains, setDomains] = React.useState(null);
  const [isLoading, setLoading] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [isFailedSetup, setIsFailedSetup] = React.useState(null);
  const timerRef = React.useRef(null);
  const [showFAB, setShowFAB] = React.useState(false);
  const setupContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (!router.isReady) return;
    initializeProjectDomain();
  }, [router.isReady]);

  React.useEffect(() => {
    if (domains == null) return;
    setupProjectDomain();
  }, [domains]);

  React.useEffect(() => {
    // if project setup api call has not happened
    if (isLoading == null) return;
    // if project setup has failed
    if (isFailedSetup) {
      clearInterval(timerRef.current);
      setMessage("Could not setup project domain!");
      return;
    }
    // if project setup has completed without error
    if (isFailedSetup == false) {
      const currentMessageIndex = Messages.findIndex((i) => i == message);
      const finalMessageDiffIndex = Messages.length - 1 - currentMessageIndex;
      if (finalMessageDiffIndex == 0) {
        // if all messages were displayed
        // clear interval and reload
        clearInterval(timerRef.current);
        window.location.reload();
      } else {
        // else some messages are yet to display
        // wait for last message to display and then reload
        setTimeout(() => {
          clearInterval(timerRef.current);
          window.location.reload();
        }, finalMessageDiffIndex * 1200);
      }
    }
    if (isLoading && timerRef.current == null) {
      let index = 0;
      setMessage(Messages[index]);
      timerRef.current = setInterval(() => {
        index++;
        if (index < Messages.length) {
          setMessage(Messages[index]);
        } else {
          clearInterval(timerRef.current);
        }
      }, [1200]);
    }
  }, [isLoading, isFailedSetup]);

  const initializeProjectDomain = async () => {
    const currentHostName = window.location.hostname.replace("www.", "");
    const currentProtocol = window.location.protocol;
    if (
      currentProtocol == "http:" &&
      !isUrlIpAddress(currentHostName) &&
      isValidUrl(currentHostName)
    ) {
      const response = await fetch(
        `/api/projectDomain?domainUrl=${currentHostName}`
      );
      const result = await response.json();
      if (result.status == 200) {
        setDomains(result.projectDomains);
      }
    }
  };

  const setupProjectDomain = async () => {
    if (domains?.length == 0) {
      // this means current project has not been setup with this domain
      try {
        setLoading(true);
        const currentHostName = window.location.hostname.replace("www.", "");
        const response = await fetch(`/api/projectDomain`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ domainUrl: currentHostName }),
        });
        const result = await response.json();
        if (result.status == 200) {
          setIsFailedSetup(false);
          console.log("successful");
        } else {
          setIsFailedSetup(true);
          console.log(result.message);
        }
      } catch (error) {
        setIsFailedSetup(true);
        setLoading(false);
      }
    }
    return;
  };

  const onClickMinimizeHandler = (status) => {
    if (showFAB) {
      // this means we need to animate setupBody visible
      setupContainerRef.current.classList.remove(styles.displayHidden);
      setupContainerRef.current.classList.remove(styles.closeSetupContainer);
      setupContainerRef.current.classList.add(styles.openSetupContainer);
      setTimeout(() => {
        setupContainerRef.current.classList.add(styles.displayShown);
      }, 800);
    } else {
      // animated setup body invisible
      setupContainerRef.current.classList.remove(styles.displayShown);
      setupContainerRef.current.classList.remove(styles.openSetupContainer);
      setupContainerRef.current.classList.add(styles.closeSetupContainer);
      setTimeout(() => {
        setupContainerRef.current.classList.add(styles.displayHidden);
      }, 300);
    }
    setShowFAB(status);
  }

  const renderSetupBody = React.useMemo(() => {
    if (message == null) return null;
    return (
      <div className={styles.mainContainer} ref={setupContainerRef}>
        <h3>Setting up protoflow in current domain!</h3>
        <span className={styles.statusText}>{message}</span>
        <img src="/images/loader1.gif" className={styles.loaderImg} />
        <button
          className="btn btn-primary mt-4 w-25"
          onClick={()=>onClickMinimizeHandler(true)}
        >
          Minimize
        </button>
      </div>
    );
  }, [message, showFAB]);

  const renderSetupProgressFAB = React.useMemo(() => {
    if (message == null || showFAB == false) return null;
    return (
      <div className={styles.fabContainer} onClick={()=>onClickMinimizeHandler(false)}>
        <img src="/images/thunder.png" />
      </div>
    )
  }, [message, showFAB])

  return <>
  {renderSetupBody}
  {renderSetupProgressFAB}
  </>;
};

export default ProjectSetup;
