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
const ProjectList = styled.article`
  text-align: left;
`

const ProjectTitle = styled.h5`
  font-weight: normal;
  font-size: 1.25rem;
  line-height: 1.2;
  margin: 0;
  
`

const ProjectDes = styled.p`
  margin: 0;
  color: #6c757d;
`

const ProjectDate = styled.p`
color: #6c757d;
`


const Project = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [projects, setProjects] = useState([])
  return (
    <ProjectContainer>
      <Title>Project</Title>
      {projects && projects.map(item => (
        <ProjectList>
          <ProjectTitle>{item.name}</ProjectTitle>
          <ProjectDes>{item.description}</ProjectDes>
          <ProjectDate>{item.startDate} ~ {item.dueDate}</ProjectDate>
        </ProjectList>
      ))}
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