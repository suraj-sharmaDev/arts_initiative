import { EventEmitter } from "@/helpers/events";

class AlertPopupHelper {
  constructor() {
    this.popups = [];
  }

  addPopup({
    title,
    subtitle,
    info,
    onSuccessCallback,
    onCancelCallback,
    successLabel = "Success",
    cancelLabel = "Cancel",
  }) {
    this.popups.push({
      title,
      subtitle,
      info,
      onSuccessCallback,
      onCancelCallback,
      successLabel,
      cancelLabel,
    });
    setTimeout(() => {
      EventEmitter.dispatch("addedPopupsForAlert");
    }, 100);
  }

  deletePopup(popupIndex) {
    this.popups.splice(popupIndex, 1);
    setTimeout(() => {
      EventEmitter.dispatch("addedPopupsForAlert");
    }, 400);
  }

  getPopups() {
    return this.popups;
  }
}

const alertPopupHelper = new AlertPopupHelper();
export default alertPopupHelper;
