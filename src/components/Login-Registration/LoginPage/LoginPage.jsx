import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";

function LoginPage() {
  const history = useHistory();

  // this component is the page that contains the login form and the option to switch to register
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      display="flex"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
    >
      <div>
        <LoginForm />
        <br />
        <center>
          <button
            type="button"
            className="btn"
            onClick={() => {
              history.push("/Register");
            }}
          >
            Register
          </button>
        </center>
      </div>
    </Box>
  );
}

export default LoginPage;
