import React from "react";
import styled from "../style/Footer.module.css";

const Footer = () => {
  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  return (
    <div className={styled.wrapper}>
      <div className="copyright">
        Copyright ©&nbsp;<span>{thisYear()}</span>&nbsp;bobpull all rights
        reserved
      </div>
    </div>
  );
}

export default Footer;
