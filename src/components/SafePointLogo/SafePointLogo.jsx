import React from "react";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { useHistory } from "react-router-dom";

function SafePointLogo() {
  const history = useHistory();

  const infoPage = () => {
    history.push("/info");
  };

  // the logo contains a clickable div that redirects the user to the info page
  return (
    <div className="safepointlogo" onClick={infoPage}>
      <h3>
        {""}
        <span className="invisSpan">asdas</span> SafePoint{" "}
        <HealthAndSafetyIcon
          sx={{
            fontSize: "3rem",
            color: "red",
            position: "relative",
            top: "0.6rem",
            height: "5vh",
          }}
        />
        <span className="invisSpan">asda ssssd</span>
        {/* 🫠💜 */}
      </h3>
    </div>
  );
}

export default SafePointLogo;
