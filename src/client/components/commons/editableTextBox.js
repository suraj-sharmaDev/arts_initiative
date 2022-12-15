import React from "react";
import styles from "./editableTextBox.module.css";

const EditableTextBox = ({ value, placeholder, callback, isEditable, ...props }) => {
  const inputRef = React.useRef(null);
  const [isDisabled, setDisabled] = React.useState(true);

  const onLocalKeyDownHandler = (e) => {
    if (e.key == "Enter") onClickEditBtn();
  };

  const onClickEditBtn = () => {
    setDisabled(!isDisabled);
    if (isDisabled) {
      // enabled editing so focus the input field
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    } else {
      // editing is ended
      callback && callback(inputRef.current.value);
    }
  };

  return (
    <div className={styles.boxContainer}>
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        defaultValue={value}
        onKeyDown={onLocalKeyDownHandler}
        disabled={isDisabled}
      />
      {isEditable && (
        <button onClick={onClickEditBtn}>
          {isDisabled ? (
            <i className={`bi bi-pen ${styles.editBtn}`}></i>
          ) : (
            <i className={`bi bi-check2 ${styles.checkBtn}`}></i>
          )}
        </button>
      )}
    </div>
  );
};

export default EditableTextBox;
