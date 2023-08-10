import React from "react";

function InfoPage() {
  // information page with our linkedin codes and names, you get here by clicking the logo
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h2>Info Page</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginRight: "1rem",
            marginLeft: "3rem",
          }}
        >
          <h2>Conrad Rolf</h2>
          <img
            src="/QrCodes/Conrad.svg"
            alt="Conrad QR Code"
            style={{ width: "250px", height: "250px" }}
          />
        </div>
        <div style={{ textAlign: "center", marginRight: "1rem" }}>
          <h2>Steven Petersen</h2>
          <img
            src="/QrCodes/Steven.svg"
            alt="Steven QR Code"
            style={{ width: "250px", height: "250px" }}
          />
        </div>
        <div style={{ textAlign: "center", marginRight: "1rem" }}>
          <h2>Touathi Vang</h2>
          <img
            src="/QrCodes/Touathi.svg"
            alt="Toathi QR Code"
            style={{ width: "250px", height: "250px" }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            marginRight: "3rem",
            alignItems: "center",
          }}
        >
          <h2>Maxwell Chrysler</h2>
          <img
            src="/QrCodes/Max.svg"
            alt="Max QR Code"
            style={{ width: "250px", height: "250px" }}
          />
        </div>
      </div>
      <div
        className="stack"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Technologies used</h1>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ textAlign: "center", margin: "1rem" }}>
            <h2>Tech Stack</h2>
            <p>Node JS</p>
            <p>Express</p>
            <p>React</p>
            <p>Postgresql</p>
            <p>Heroku</p>
          </div>
          <div style={{ textAlign: "center", margin: "1rem" }}>
            <h2>Design tools</h2>
            <p>DB designer</p>
            <p>Figma</p>
          </div>
          <div style={{ textAlign: "center", margin: "1rem" }}>
            <h2>Specialty</h2>
            <p>Material UI (mui)</p>
            <p>Sweet alerts</p>
            <p>Passport</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
