import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ setIsAdding, awards, setAwards }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [degree, setDegree] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
    console.log(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="useAddTitle" className="mb-3">
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={title}
          onChange={handleTitleChange}
        />
      </Form.Group>

      <Form.Group controlId="userAddContent" className="mb-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={description}
          onChange={handleBodyChange}
        />
      </Form.Group>

      <Form.Group controlId="userAddDegree" className="mb-3">
        <Form.Check inline type="radio" label="재학중" value="재학중" checked={degree==="재학중"} onChange={handleDegreeChange} />
        <Form.Check inline type="radio" label="학사졸업" value="학사졸업" checked={degree==="학사졸업"} onChange={handleDegreeChange} />
        <Form.Check inline type="radio" label="석사졸업" value="석사졸업" checked={degree==="석사졸업"} onChange={handleDegreeChange} />
        <Form.Check inline type="radio" label="박사졸업" value="박사졸업" checked={degree==="박사졸업"} onChange={handleDegreeChange} />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;
