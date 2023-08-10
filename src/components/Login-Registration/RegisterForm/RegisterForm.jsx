import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

function RegisterForm() {
  // setting local states for user inputed information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // stores for the component
  const errors = useSelector((store) => store.errors);
  // checks if the user is registering as a venue or as an attendee
  const isVenue = useSelector((store) => store.isVenue);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    // If password and confirmPassword does not match send Alert
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // dispatches the user information to be stored in the db when register is clicked
    dispatch({
      type: "REGISTER",
      payload: {
        first_name: firstName,
        last_name: lastName,
        username: email,
        password: password,
        is_venue: isVenue,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser} autoComplete="off">
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <TextField
          style={{ backgroundColor: "aliceblue", border: 2, borderRadius: 5 }}
          label="First Name"
          size="small"
          variant="outlined"
          type="firstName"
          name="firstName"
          required
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          // marginRight gets it to be in the middle of the page height actually changes the spacing below
          sx={{ width: "200px" }}
        />
      </div>

      <br />

      <div>
        <TextField
          style={{ backgroundColor: "aliceblue", border: 2, borderRadius: 5 }}
          label="Last Name"
          size="small"
          variant="outlined"
          type="lastName"
          name="lastName"
          required
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          // marginRight gets it to be in the middle of the page height actually changes the spacing below
          sx={{ width: "200px" }}
        />
      </div>

      <br />

      <div>
        <TextField
          style={{ backgroundColor: "aliceblue", border: 2, borderRadius: 5 }}
          label="Email"
          size="small"
          variant="outlined"
          type="email"
          name="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          // marginRight gets it to be in the middle of the page height actually changes the spacing below
          sx={{ width: "200px" }}
        />
      </div>

      <br />

      <div>
        <TextField
          style={{ backgroundColor: "aliceblue", border: 2, borderRadius: 5 }}
          label="Password"
          size="small"
          variant="outlined"
          type="password"
          name="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          // marginRight gets it to be in the middle of the page height actually changes the spacing below
          sx={{ width: "200px" }}
        />
      </div>

      <br />

      <div>
        <TextField
          style={{ backgroundColor: "aliceblue", border: 2, borderRadius: 5 }}
          label="Confirm Password"
          size="small"
          variant="outlined"
          type="password"
          name="password"
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          // marginRight gets it to be in the middle of the page height actually changes the spacing below
          sx={{ width: "200px" }}
        />
      </div>

      <br />

      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
