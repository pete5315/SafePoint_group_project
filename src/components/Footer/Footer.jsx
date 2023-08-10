import React from "react";
import "./Footer.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

function Footer() {
  const dispatch = useDispatch();
  const history = useHistory();
  // logout button is attatched to the text in the footer
  function logOut() {
    dispatch({ type: "UNSET_USER" });
    dispatch({ type: "LOGOUT" });
    history.push("/Login");
  }

  // simple footer for the bottom of the page
  return (
    <div className="footer">
      <br />
      <br />
      <Stack spacing={1} direction="column">
        <Divider
          variant="middle"
          sx={{ backgroundColor: "rgb(59, 64, 158)" }}
        />
        <footer onClick={() => logOut()}>&copy; Zach M. Lulavy LLC</footer>
      </Stack>
    </div>
  );
}

export default Footer;
