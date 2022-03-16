import React, {useState, useEffect} from "react";
import axios from "axios"
import AddProject from "./AddProject"

import styled from "styled-components"
import {Button} from "react-bootstrap";

const ProjectContainer = styled.div`
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
  padding: 20px;
`
const Title = styled.h2`
  text-align: left;
  font-weight: normal;
  font-size: 1.25rem;
`

const Project = () => {
  const [click, setClick] = useState(false)
  
  return (
    <ProjectContainer>
      <Title>Project</Title>
      <Button
        onClick={() => setClick(true)}
        variant="primary" 
        className="mb-3"
      >추가</Button>
      {click && <AddProject/>}
    </ProjectContainer>
  );
}

export default Project