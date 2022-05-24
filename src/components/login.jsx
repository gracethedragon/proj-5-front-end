import React, { useEffect, useState } from "react";
import axios from "axios";

export function Login({ setAuthorized }) {
  const [login, setLogin] = useState(true);
  const [create, setCreate] = useState(false);

  function checkLogin(e) {
    e.preventDefault();
    console.log("login");
    setAuthorized(true);
  }
  return (
    <div>
      <form onSubmit={(e) => checkLogin(e)}>
        <div id="login-container">
          {login && <h2>Login to your account</h2>}
          {create && <h2>Create an account</h2>}
          <label>email</label>
          <br />
          <input type="text" name="email"></input>
          <br />
          <label>password</label>
          <br />
          <input type="text" name="password"></input>
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
                  //axios.post
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
