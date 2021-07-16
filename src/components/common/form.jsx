import { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    // for breathing of our code, we extracted this
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    const errors = {};
    if (!error) return null;

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  // validating single property at a time
  validateProperty = ({ name, value }) => {
    // [name] for setting the name property at runtime
    const obj = { [name]: value };
    // schema[name] take one prop at a time according to name dynamically
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    return error.details[0].message;
  };

  handleChange = ({ currentTarget }) => {
    // handling single input error at a time when changed by using this.valideProperty
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(currentTarget);
    if (errorMessage) errors[currentTarget.name] = errorMessage;
    else delete errors[currentTarget.name];
    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderButton = (label) => {
    return (
      <button
        type="submit"
        className="btn btn-primary shadow-sm"
        disabled={this.validate()}
      >
        <i
          className={
            label === "Register"
              ? "fa fa-user-plus px-2"
              : label === "Login"
              ? "bi bi-box-arrow-in-right px-2"
              : "bi bi-save px-2"
          }
        ></i>
        {label}
      </button>
    );
  };

  renderInput = (name, label, type) => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        errors={errors[name]}
        value={data[name]}
        type={type}
        onChange={this.handleChange}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        errors={errors[name]}
        value={data[name]}
        options={options}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
