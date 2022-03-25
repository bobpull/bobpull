import React, {useState, useContext} from "react"
import * as Api from "../../api";
import { Form, Row, Col, Button } from 'react-bootstrap';
import TodayDate from "../../today/TodayDate"
import {ProjectContext} from "../../context/ProjectContext"

const today = TodayDate()

const ProjectEditForm = ({project, setIsEditForm}) => {
    const {projects,dispatch} = useContext(ProjectContext)
    const [newProject, setNewProject] = useState({
      ...project,
      to_date: project.to_date.toString().substr(0,10),
      from_date: project.from_date.toString().substr(0,10),
    })
    console.log(project)

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      await Api.put(`projects/${project.id}`, newProject)
      dispatch({type: "put-project", payload: newProject})
      setIsEditForm(false)
    } catch(e){
      console.log(e)
    }
  }
  const onChange = (e) => {
    setNewProject(cur => {
      return {
        ...cur,
        [e.target.name]: e.target.value
      }
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
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="projectDescription">
        <Form.Control 
          as="textarea" 
          placeholder="상세설명"
          name="description" 
          value={newProject.description}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="projectUrl">
        <Form.Control  
          placeholder="url"
          name="url" 
          value={newProject.url}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="시작일">
        <Col sm>
          <Form.Control 
            type="date" 
            placeholder="시작일"
            name="from_date" 
            onChange={onChange}
            value={newProject.from_date}
            max={today}
            required
          />
        </Col>
        <Col sm>
          <Form.Control 
            type="date" 
            placeholder="끝"
            name="to_date" 
            value={newProject.to_date}
            min={newProject.from_date}
            max={today}
            onChange={onChange}
            required
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