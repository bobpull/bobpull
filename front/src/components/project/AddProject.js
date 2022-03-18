import React, {useState} from "react";
import * as Api from "../../api";
import { Form, Row, Col, Button } from 'react-bootstrap';

const AddProject = ({setIsEditing, projects, setProjects}) => {
  const today = new Date();
  const date = today.setDate(today.getDate()+1); 
  const defaultValue = new Date(date).toISOString().split('T')[0]

  const [project, setProject] = useState({
    title: "",
    description: "",
    from_date: `${defaultValue}`,
    to_date: `${defaultValue}`,
  })

  const validData = 
    project.title && project.description && project.from_date && project.to_date
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await Api.post("project/create", project);
      setProjects([...projects, res.data])
      setIsEditing(false)
    } catch(e) {
      console.log(e)
    }
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
          name="title"
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
            name="from_date" 
            value={project.from_date}
            onChange={onChange}
          />
        </Col>
        <Col sm>
          <Form.Control 
            type="date" 
            placeholder="끝"
            name="to_date" 
            value={project.to_date}
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