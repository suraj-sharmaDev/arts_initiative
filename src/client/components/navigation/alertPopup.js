import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { EventEmitter } from "@/helpers/events";
import alertPopupHelper from "./alertPopupHelper";

const AlertPopup = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({});

  useEffect(()=>{
    EventEmitter.subscribe("addedPopupsForAlert", initializePopupData);
    return ()=>{
      EventEmitter.unsubscribe("addedPopupsForAlert");
    }
  }, []);

  const initializePopupData = () => {
    const retirevedPopups = alertPopupHelper.getPopups();
    if (retirevedPopups.length > 0) {
      setPopupData(retirevedPopups[0]);
      setShowPopup(true);
    } else {
      setPopupData({});
      setShowPopup(false);
    }
    return;
  }

  const onPressModalCloseBtn = () => {
    popupData.onCancelCallback && popupData.onCancelCallback();
    setShowPopup(false);
    alertPopupHelper.deletePopup(0);
  };

  const onPressModalSuccessBtn = () => {
    popupData.onSuccessCallback && popupData.onSuccessCallback();
    setShowPopup(false);
    alertPopupHelper.deletePopup(0);
  };

  const renderBodyForModal = () => {
    return (
      <div className="text-center">
        <h4>{popupData.title}</h4>
        <span>{popupData.subtitle}</span>
        <p style={{margin: 0}}>{popupData.info}</p>
      </div>
    );
  };

  const renderFooterForModal = () => {
    return (
      <div className="d-flex justify-content-around w-100">
        <button
          className="btn btn-success w-25"
          onClick={onPressModalSuccessBtn}
        >
          {popupData.successLabel}
        </button>
        <button className="btn btn-danger w-25" onClick={onPressModalCloseBtn}>
          {popupData.cancelLabel}
        </button>
      </div>
    );
  };

  return (
    <Modal show={showPopup} onHide={onPressModalCloseBtn} centered>
      <Modal.Body>{renderBodyForModal()}</Modal.Body>
      <Modal.Footer>{renderFooterForModal()}</Modal.Footer>
    </Modal>
  );
};

export default AlertPopup;
