import React, {useState} from "react"
import {Form, Button, Modal } from "react-bootstrap";

const AddSkillForm = ({show, setShow}) => {
  const [skills, setSkill] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    // axios.post("", skills)
  }
  const onChange = (e) => {
    setSkill(cur => {
    return cur + e.target.value 
  })
}
  return (
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>주요 기술</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="projectId">
        <Form.Control 
          type="text" 
          placeholder="기술스택을 영어로 작성해주세요"
          name="skill"
          onChange={onChange}
          required
        />
      </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={() => setShow(false)}>
        취소
      </Button>
    <Button variant="primary" type="submit">
        저장
      </Button>
      
    </Modal.Footer>
  </Modal>)
}

  export default AddSkillForm

