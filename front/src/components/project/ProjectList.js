import React from "react";
import styled from "styled-components"

const ProjectList1 = styled.article`
  text-align: left;
  margin-bottom: 0.5rem;
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
  margin-bottom: 0;
`
const ProjectList = ({project}) => {
  return (
    <ProjectList1>
      <ProjectTitle>{project.title}</ProjectTitle>
      <ProjectDes>{project.description}</ProjectDes>
      <ProjectDate>{project.from_date} ~ {project.to_date}</ProjectDate>
    </ProjectList1>   
  )
}

export default ProjectList