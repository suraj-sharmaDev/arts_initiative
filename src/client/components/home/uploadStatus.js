import React from "react";
import Image from "next/image";
import styles from "./body.module.css";

const UploadStatus = ({ status, ...props }) => {
  const loadingState = [
    {
      image: "/images/uploading.gif",
      text: ["uploading", "transcribe", "success"],
    },
    {
      image: "/images/transcribing.gif",
      text: ["uploaded", "transcribing", "success"],
    },
    {
      image: "/images/success.gif",
      text: ["uploaded", "transcribed", "success"],
    },
  ];

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: "1rem" }}>
        <Image
          src={loadingState[status].image}
          width="100%"
          height="100%"
          alt="loader"
        />
      </div>
      <div className={styles.loadingState}>
        {loadingState[status].text.map((text, index) => {
          return (
            <div
              key={index}
              className={`${index === 1 && styles.middle} ${
                styles.loadingState_div
              }`}
              style={{ color: index === status && "var(--textColor)" }}
            >
              {((index < status || status === 2) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className={`bi bi-check-circle-fill ${styles.tickIcon}`}
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
              )) ||
                (index === status && (
                  <Image
                    src="/images/gear.gif"
                    width={34}
                    height={34}
                    alt="loader"
                  />
                )) || <p className={styles.loadingStateNumbers}>{index + 1}</p>}
              <p className={styles.resetMargin}>{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadStatus;
