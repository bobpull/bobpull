import React, {useState, useEffect} from "react";
import axios from "axios"
import AddProject from "./AddProject"
import ProjectList from "./ProjectList"

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
  const [isEditing, setIsEditing] = useState(false)
  const [projects, setProjects] = useState([])
  return (
    <ProjectContainer>
      <Title>Project</Title>
      {projects && projects.map(item => 
      <>
          <ProjectList
            project={item}
          />
        </>
        )}
      <Button
        onClick={() => setIsEditing(true)}
        variant="primary"
        className="mb-3"
      >추가</Button>
      
      {isEditing &&
       <AddProject
        setIsEditing={setIsEditing}
        projects={projects}
        setProjects={setProjects}
      />
       }
    </ProjectContainer>
  );
}

export default Project