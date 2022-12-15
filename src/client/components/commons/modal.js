import React from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = (props) => {
  const [isOpen, setOpen] = React.useState(true);

  const {
    title = "Dummy text",
    children = null,
    isCloseBtnActive = false,
    closeBtnCallback = () => {},
    isSuccessBtnActive = false,
    successBtnCallback = () => {},
  } = props;

  React.useEffect(() => {
    setOpen(props.show);
  }, [props.show]);

  const onPressCloseBtn = () => {
    setOpen(false);
    closeBtnCallback && closeBtnCallback();
  }

  const onPressSuccessBtn = () => {
    setOpen(false);
    successBtnCallback && successBtnCallback();
  }

  return (
    <Modal show={isOpen} onHide={onPressCloseBtn} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {isCloseBtnActive && (
          <Button variant="secondary" onClick={onPressCloseBtn}>
            Close
          </Button>
        )}
        {isSuccessBtnActive && (
          <Button variant="secondary" onClick={onPressSuccessBtn}>
            Submit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
