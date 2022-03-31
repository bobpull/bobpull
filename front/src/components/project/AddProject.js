import React, {useState, useContext} from "react";
import * as Api from "../../api";
import { Form, Row, Col, Button } from 'react-bootstrap';
import TodayDate from "../../today/TodayDate"
import {ProjectContext} from "../../context/ProjectContext"


const todayDate = TodayDate();

const AddProject = ({setIsEditing}) => {
  const {dispatch} = useContext(ProjectContext)
  const [project, setProject] = useState({
    title: "",
    description: "",
    url: "",
    from_date: `${todayDate}`,
    to_date: `${todayDate}`,
  })

  
  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      // project id값을 받기 위해 res 변수 선언.
      const res = await Api.post("project/create", project);
      dispatch({type: "add-project", payload: res.data})
      setIsEditing(false)
    } catch(e) {
      console.log(e)
    }
  }
  const onChange = (e) => {
    setProject(cur => {
      return {
        ...cur,
        [e.target.name]: e.target.value
      }
    })
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
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="projectDescription">
        <Form.Control 
          as="textarea" 
          placeholder="상세설명"
          name="description" 
          value={project.description}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="projectUrl">
        <Form.Control  
          placeholder="url"
          name="url" 
          value={project.url}
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
            value={project.from_date}
            onChange={onChange}
            max={todayDate}
            required
          />
        </Col>
        <Col sm>
          <Form.Control 
            type="date" 
            placeholder="끝"
            name="to_date" 
            value={project.to_date}
            onChange={onChange}
            min={project.from_date}
            max={todayDate}
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