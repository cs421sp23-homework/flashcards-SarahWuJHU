import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginPage(props) {
  let [authMode, setAuthMode] = useState("signin");
  const { userLogin, userRegister } = props;
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    const m = userLogin(user);
    document.getElementById("message").value = m;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    const m = userRegister(user);
    document.getElementById("message").value = m;
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
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
                onClick={handleLogin}
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
            <span className="link-primary" onClick={changeAuthMode}>
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
              onClick={handleRegister}
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
export default LoginPage;
