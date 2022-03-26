import React from "react";
import { Col, Row } from "react-bootstrap";
import "../style/footer.css";

function Footer() {
  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  return (
    <div
      className="Wrapper"
      style={{
        backgroundColor: "#FFEAA1",
        height: "50px",
        fontFamily: "Do Hyeon, sans-serif",
      }}
    >
      <div className="copyright">
        Copyright ©&nbsp;<span>{thisYear()}</span>&nbsp;bobpull all rights reserved
      </div>
    </div>
  );
}

export default Footer;
