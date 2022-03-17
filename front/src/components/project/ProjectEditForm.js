import React, {useState} from "react"
import axios from "axios";
import { Form, Row, Col, Button } from 'react-bootstrap';

const ProjectEditForm = ({project, setIsEditForm}) => {

    const [newProject, setNewProject] = useState({
      title: project.title,
      description: project.description,
      from_date: project.from_date,
      to_date: project.to_date,
    })

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put('http://localhost:5000/projects/:id', newProject)
  }
  const onChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Form onSubmit={onSubmit} className="mb-3">
      <Form.Group className="mb-3" controlId="projectId">
        <Form.Control 
          type="text" 
          placeholder="프로젝트명"
          name="title"
          value={newProject.title}
          onChange={onChange} 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="projectDescription">
        <Form.Control 
          as="textarea" 
          placeholder="상세설명"
          name="description" 
          value={newProject.description}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="시작일">
        <Col sm>
          <Form.Control 
            type="date" 
            placeholder="시작일"
            name="from_date" 
            value={newProject.from_date}
            onChange={onChange}
          />
        </Col>
        <Col sm>
          <Form.Control 
            type="date" 
            placeholder="끝"
            name="to_date" 
            value={newProject.to_date}
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
              >
                확인
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setIsEditForm(false)}
              >
                취소
              </Button>
            </Col>
          </Form.Group>
    </Form>
  )
}

export default ProjectEditForm