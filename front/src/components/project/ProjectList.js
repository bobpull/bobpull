import styled from "styled-components"

const ProjectList1 = styled.article`
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

const ProjectList = ({project}) => {
  return (
    <ProjectList1>
      <ProjectTitle>{project.name}</ProjectTitle>
      <ProjectDes>{project.description}</ProjectDes>
      <ProjectDate>{project.startDate} ~ {project.dueDate}</ProjectDate>
    </ProjectList1>   
  )
}

export default ProjectList