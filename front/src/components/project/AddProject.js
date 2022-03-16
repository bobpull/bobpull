import React, {useState} from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';

const AddProject = ({setIsEditing, projects, setProjects}) => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    dueDate: "",
  })
  const validData = 
    project.name && project.description && project.startDate && project.dueDate
  
  const onSubmit = (e) => {
    e.preventDefault();
    setProjects([...projects,project])
    console.log(project)
    setIsEditing(false)
  }
  const onChange = (e) => {
    const newProject = {
      ...project,
      [e.target.name]: e.target.value
    }
    setProject(newProject)
  }



  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="projectId">
        <Form.Control 
          type="text" 
          placeholder="프로젝트명"
          name="name"
          value={project.name}
          onChange={onChange} 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="projectDescription">
        <Form.Control 
          as="textarea" 
          placeholder="상세설명"
          name="description" 
          value={project.description}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="시작일">
        <Col sm>
          <Form.Control 
            type="date" 
            placeholder="시작일"
            name="startDate" 
            value={project.startDate}
            onChange={onChange}
          />
        </Col>
        <Col sm>
          <Form.Control 
            type="date" 
            placeholder="끝"
            name="dueDate" 
            value={project.dueDate}
            onChange={onChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
            <Col sm>
              <Button
                variant="primary" 
                type="submit" 
                className="me-3"
                disabled={!validData}
              >
                확인
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setIsEditing(false)}
              >
                취소
              </Button>
            </Col>
          </Form.Group>
    </Form>
  )
}

export default AddProject