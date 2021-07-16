import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(5).max(255).email().required().label("Username"),
    password: Joi.string().min(5).max(15).required().label("Password"),
    name: Joi.string().min(5).max(50).required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const { headers } = await userService.registerUser(this.state.data);
      console.log(headers);
      auth.loginWithJwt(headers["x-auth-secret"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="row">
        <div className="offset-1 col-10 offset-md-3 col-md-6">
          <h1 className="text-center py-3">Register</h1>
          <hr />
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name", "text")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
