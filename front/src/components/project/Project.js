import React, {useState, useEffect} from "react";
import axios from "axios"

import AddProject from "./AddProject"
import ProjectList from "./ProjectList"
import ProjectEditForm from "./ProjectEditForm"

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
const ListContainer = styled.div`  
`
const ListFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Project = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isEditForm, setIsEditForm] = useState(false)
  const [projects, setProjects] = useState([])

  // get projects data
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await axios.get('http://localhost:5001/projectlist/:user_id')
      setProjects(res.data.data)
    }
    fetchAPI()
  }, [])

  return (
    <ProjectContainer>
      <Title>Project</Title>
      {projects && projects.map(item => 
        <ListContainer>
          {isEditForm ? 
         
          <ProjectEditForm
            project={item}
            setIsEditForm={setIsEditForm}
          />
           :
           <ListFlex>
           <ProjectList
            project={item}
          />
          <Button 
            variant="outline-info" 
            size="sm"
            onClick={() => setIsEditForm(true)}
          >편집</Button>
          </ListFlex>
          
        }
          
        </ListContainer>
        )}
      
      <Button
        onClick={() => setIsEditing(true)}
        variant="primary"
        className="mb-3"
      >추가</Button>
      
       {isEditing && <AddProject
        setIsEditing={setIsEditing}
        projects={projects}
        setProjects={setProjects}
      />}
       
    </ProjectContainer>
  );
}

export default Project