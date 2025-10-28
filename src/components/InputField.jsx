import React from "react";

const InputField = React.memo(({ label, type = "text", value, onChange, required }) => {
  //Making it a pure component that only re-renders when properties of React.memo() change

  console.log(`Rendering InputField: ${label}`);
  return (
    <div className="input-group">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} required={required} />
    </div>
  );
});

export default InputField;
