import React from "react";
import { Modal, Button } from "react-bootstrap";
import { adminApi } from "src/client/clientConfig/clientConstants";
import styles from "./integrations.module.css";

const TutorialModal = ({
  show = false,
  closeBtnCallback = () => {},
  ...props
}) => {
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(show);
  }, [show]);

  const onPressCloseBtn = () => {
    setOpen(false);
    closeBtnCallback && closeBtnCallback();
  };

  const videoUrl = adminApi + "/api/serveVideo/tutorial.mp4";

  return (
    <Modal show={isOpen} centered size={"lg"}>
      <button className={styles.tutorialCloseBtn} onClick={onPressCloseBtn}>
        <i className="bi bi-x-circle-fill"></i>
      </button>
      <Modal.Body>
        <video controls style={{ width: "100%", height: "100%" }}>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </Modal.Body>
    </Modal>
  );
};

export default TutorialModal;
