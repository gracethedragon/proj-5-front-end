import React, { useEffect, useState } from "react";
import { instance } from "../connection/my-axios.mjs";

export function Login({ setToken, setUsername }) {
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
  async function checkLogin(e) {
    e.preventDefault();

    console.log("login");

    try {
      const response = await instance.get("/login", {
        params: { email, password },
      });

      const { token, username } = response.data;

      console.log(
        `Token and Username Received from Login Response  t: ${token} u: ${username}`
      );
      console.log(`Setting state: Token`);
      setToken(token);
      setUsername(username);
    } catch (err) {
      console.log("something wrong login request to server");
    }
  }

  function createAccount() {
    console.log("create account");
    const password2 = password;

    const data = { email, password, password2 };
    console.log(data);
    instance
      .post("/register", data)
      .then((response) => console.log(response, "posted"));
  }
  return (
    <div id="login-container">
      <form onSubmit={(e) => checkLogin(e)}>
        
          {login && <h2>Login to your account</h2>}
          {create && <h2>Create your account</h2>}
          <label>Username</label>
          <br />
          <input
            type="text"
            name="email"
            onChange={(event) => handleInputChange(event)}
          ></input>
          <br />
          <label>Password</label>
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
                value="Create account"
                onClick={() => {
                  setCreate(true);
                  setLogin(false);
                }}
              ></input>
              <input type="submit" id="button" name="login" value="Login"></input>
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
                value="Create account"
                onClick={() => {
                  createAccount();
                  setCreate(false);
                  setLogin(true);
                }}
              ></input>
            </div>
          )}
        
      </form>
    </div>
  );
}
