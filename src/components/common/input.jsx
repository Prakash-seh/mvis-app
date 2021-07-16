import React from "react";

const Input = ({ name, label, errors, ...rest }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control shadow-sm"
      />
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Input;
