import React, { useState, Component } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { authMode: "signin" };
    this.changeAuthMode = this.changeAuthMode.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  changeAuthMode = () => {
    this.setState((state) => {
      state.authMode = state.authMode === "signin" ? "signup" : "signin";
      return state;
    });
  };

  async handleLogin(e) {
    e.preventDefault();
    const user = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    const res = await this.props.userLogin(user);
    document.getElementById("message").innerText = res.m;
    this.props.navigate("/display");
  };

  async handleRegister(e) {
    e.preventDefault();
    const user = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    const res = await this.props.userRegister(user);
    document.getElementById("message").innerText = res.m;
    //this.props.navigate("/display");
  };

  render(){
    if (this.state.authMode === "signin") {
        return (
          <div className="Auth-form-container">
            <form className="Auth-form">
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="text-center">
                  Not registered yet?{" "}
                  <span className="link-primary" onClick={this.changeAuthMode}>
                    Sign Up
                  </span>
                </div>
                <div className="form-group mt-3">
                  <label>Username</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter username"
                    id="username"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    id="password"
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.handleLogin}
                  >
                    Submit
                  </button>
                </div>
                <div>
                  <p className="text-danger" id="message">
                    {" "}
                    Please enter username or password!{" "}
                  </p>
                </div>
              </div>
            </form>
          </div>
        );
      }
    
      return (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Already registered?{" "}
                <span className="link-primary" onClick={this.changeAuthMode}>
                  Sign In
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter username"
                  id="username"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  id="password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleRegister}
                >
                  Submit
                </button>
              </div>
              <div>
                <p className="text-danger" id="message">
                  {" "}
                  Please enter username or password!{" "}
                </p>
              </div>
            </div>
          </form>
        </div>
      );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <LoginPage {...props} navigate={navigate} />
}
export default WithNavigate;
