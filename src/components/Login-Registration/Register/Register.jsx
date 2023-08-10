import React from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import Box from "@mui/material/Box";

function Register() {
  // this page contains the register form and the option to switch to login instead
  const history = useHistory();

  const handleLoginButtonClick = () => {
    // Redirect to "/Login" when the button is clicked
    history.push("/Login");
  };

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
      <div className="reg">
        <RegisterForm />
        <br />
        <button className="btn" onClick={handleLoginButtonClick}>
          Login
        </button>
      </div>
    </Box>
  );
}

export default Register;
