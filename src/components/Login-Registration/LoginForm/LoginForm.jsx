import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "../Welcome/WelcomeCSS/Welcome.css";
import TextField from "@mui/material/TextField";

function LoginForm() {
  // setting local state for the inputs of the user trying to login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  // dispatches the user inputed information to check it against the stored information
  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <div className="username">
      <form className="formPanel" onSubmit={login}>
        <h2>Login</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div className="username">
          {/* this is used to more center the username: with the textField */}
          <label htmlFor="username" style={{ lineHeight: 4.5 }}>
            <TextField
              style={{
                backgroundColor: "aliceblue",
                border: 2,
                borderRadius: 5,
              }}
              label="Email"
              variant="outlined"
              type="text"
              name="username"
              size="small"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              // marginRight gets it to be in the middle of the page
              sx={{ width: "150px" }}
            />
          </label>
        </div>

        <div>
          <label htmlFor="password" style={{ lineHeight: 4.5 }}>
            <TextField
              style={{
                backgroundColor: "aliceblue",
                border: 2,
                borderRadius: 5,
              }}
              label="Password"
              size="small"
              variant="outlined"
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              // marginRight gets it to be in the middle of the page height actually changes the spacing below
              sx={{ width: "150px" }}
            />
          </label>
        </div>

        <br />

        <div>
          <input className="btn" type="submit" name="submit" value="Log In" />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
