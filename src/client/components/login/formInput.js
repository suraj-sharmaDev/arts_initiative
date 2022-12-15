import React from "react";

const FormInput = ({ type, label, value = "", callback = () => {} }) => {
  const onLocalChangeHandler = (e) => {
    callback && callback(e);
  };
  const onLocalSubmitHandler = e => {
    e.preventDefault();
    callback && callback("submit");
  }
  const uniqueInputId = Math.random().toString(36).slice(2);
  return (
    <form className="form-floating mb-2" onSubmit={onLocalSubmitHandler}>
      <input
        type={type}
        className="form-control"
        id={uniqueInputId}
        placeholder="name@example.com"
        onChange={(e) => onLocalChangeHandler(e)}
        defaultValue={value}
      />
      <label htmlFor={uniqueInputId}>{label}</label>
    </form>
  );
};

export default FormInput;
