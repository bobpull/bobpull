import React, {useState} from "react"
import * as Api from "../../api";
import { Form, Row, Col, Button } from 'react-bootstrap';

const ProjectEditForm = ({item, projects, setIsEditForm, setProjects, fetchAPI}) => {
    const [newProject, setNewProject] = useState({
      ...item
    })

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await Api.put(`projects/${item._id}`, newProject)
      // Project.js의 get api 호출 
      fetchAPI()
      setIsEditForm(false)
    } catch(e){
      console.log(e)
    }

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
            value={item.from_date.toString().substr(0,10)}
            onChange={onChange}
          />
        </Col>
        <Col sm>
          <Form.Control 
            type="date" 
            placeholder="끝"
            name="to_date" 
            value={item.to_date.toString().substr(0,10)}
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