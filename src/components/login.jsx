import React, { useEffect, useState } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

export function Login({ setAuthorized }) {
  const [login, setLogin] = useState(true);
  const [create, setCreate] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleInputChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
    console.log(email, password);
  };
  function checkLogin(e) {
    e.preventDefault();
    setAuthorized(true);
    console.log("login");

    // instance
    //   .get("/login", { email, password })
    //   .then((response) => console.log(response, "logged"));
  }

  function createAccount() {
    console.log("create account");
    const password2 = password;
    console.log(data);
    // instance
    //   .post("/register", { email, password, password2 })
    //   .then((response) => console.log(response, "posted"));
  }
  return (
    <div>
      <form onSubmit={(e) => checkLogin(e)}>
        <div id="login-container">
          {login && <h2>Login to your account</h2>}
          {create && <h2>Create an account</h2>}
          <label>email</label>
          <br />
          <input
            type="text"
            name="email"
            onChange={(event) => handleInputChange(event)}
          ></input>
          <br />
          <label>password</label>
          <br />
          <input
            type="text"
            name="password"
            onChange={(event) => handleInputChange(event)}
          ></input>
          <br />

          {login && (
            <div id="login-buttons">
              <input
                type="button"
                name="create"
                value="Create Account"
                onClick={() => {
                  setCreate(true);
                  setLogin(false);
                }}
              ></input>
              <input type="submit" name="login" value="Login"></input>
            </div>
          )}
          {create && (
            <div id="create-buttons">
              <input
                type="button"
                name="create"
                value="I have an account"
                onClick={() => {
                  setCreate(false);
                  setLogin(true);
                }}
              ></input>
              <input
                type="button"
                name="create"
                value="Create my account"
                onClick={() => {
                  createAccount();
                  setCreate(false);
                  setLogin(true);
                }}
              ></input>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
