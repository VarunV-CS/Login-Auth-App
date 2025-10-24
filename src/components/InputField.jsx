import React from "react";
import "../styles/style.css";

const InputField = ({ label, type, value, onChange, required }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
