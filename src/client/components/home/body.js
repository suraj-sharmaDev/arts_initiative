import React from "react";
import styles from "./body.module.css";
import { useTimer } from "./hooks";
import UploadStatus from "./uploadStatus";

const HomeBody = ({
  isRecording,
  toggleRecorder,
  uploadFile,
  status,
  isLoading,
  ...props
}) => {
  const btnClassName = isRecording ? "btn-danger" : "btn-primary";
  const { timeValue, startTimer, stopTimer } = useTimer();

  const onClickBtnHandler = () => {
    const shouldStartTimer = isRecording == false;
    toggleRecorder().then(() => {
      if (shouldStartTimer) {
        startTimer();
        return;
      }
      stopTimer();
    });
  };

  const onLocalFileChange = (e) => {
    uploadFile(e);
  };

  return isLoading ? (
    <UploadStatus status={status} />
  ) : (
    <div className={styles.container}>
      <img src="/images/text-to-speech-1.png" className={styles.bodyImage} />
      <p>Click Record to begin recording and press second time to end</p>
      <div className={styles.btnContainer}>
        <button
          className={`btn ${btnClassName} ${styles.recordBtn}`}
          onClick={onClickBtnHandler}
        >
          {isRecording ? `Recording... ${timeValue}` : "Record"}
          <i className={`bi bi-${isRecording ? "stop" : "play"}-circle`}></i>
        </button>
        <span>Or</span>
        <label className={styles.uploadBtn}>
          <input
            type="file"
            onChange={onLocalFileChange}
            style={{ display: "none" }}
            accept="audio/*, video/*, .txt, .doc, .docx"
          />
          <i className="bi bi-sticky"></i>
        </label>
        <p>Upload Audio</p>
      </div>
    </div>
  );
};

export default HomeBody;
