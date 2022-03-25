import React from "react"
import { AiFillLock } from "react-icons/ai";
import { FaLock } from "react-icons/fa";

import "../../style/badge.css"

const BadgeLock = () => {
  return <div className="lockBox"><FaLock size="10" style={{color: "white"}}/></div>
}

export default BadgeLock