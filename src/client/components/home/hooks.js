import { useRef, useState } from "react";
import alertPopupHelper from "../navigation/alertPopupHelper";

export const checkOpenAIKeyStatus = (
  openAIKeyId,
  onboarding,
  isAdmin,
  callback
) => {
  return new Promise((resolve, reject) => {
    try {
      const { showAddOpenAIKey } = onboarding;
      if (
        isAdmin &&
        typeof openAIKeyId == "undefined" &&
        showAddOpenAIKey == true
      ) {
        alertPopupHelper.addPopup({
          title: "Setup OpenAI Key",
          subtitle: `You can setup your openAI key inside setting page!`,
          onSuccessCallback: () => callback("openaistatus"),
          onCancelCallback: () => callback("openaistatus", false),
          successLabel: "Settings",
          cancelLabel: "Later",
        });
        reject(false);
      }
      resolve(true);
    } catch (error) {
      reject(false);
    }
  });
};

export const checkAudioTranscriptionValidity = (
  centralAdminBananaStatus,
  adminAuths,
  isAdmin,
  callback
) => {
  // check if users central admin banana dev api
  // bandwidth is not exhausted
  // if its exhausted also check if instance user
  // has setup banana dev auth
  return new Promise((resolve, reject) => {
    try {
      if (centralAdminBananaStatus == false) {
        if (adminAuths == null) {
          alertPopupHelper.addPopup({
            title: "BananaDev Api exhausted!",
            subtitle: `You have exhausted the trial limit for text to speech api!`,
            info: isAdmin
              ? "Please setup banana keys in setting page."
              : "Notify your admin to setup banana dev keys in settings page.",
            onSuccessCallback: () => callback("bananastatus"),
            successLabel: "Settings",
            cancelLabel: "Later",
          });
          reject(false);
        }
        resolve(true);
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const useTimer = () => {
  const [timeValue, setTimeValue] = useState("00:00");
  const timerRef = useRef(null);

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    let i = 0;
    let time = 0;
    timerRef.current = setInterval(() => {
      i++;
      const minutes = Math.floor(i / 60);
      const seconds = i % 60;
      time = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
      setTimeValue(time);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setTimeValue("00:00");
  };

  return { timeValue, startTimer, stopTimer };
};
