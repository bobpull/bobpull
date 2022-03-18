import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({
  id,
  setIsEditing,
  _school,
  _major,
  _position,
  educations,
  setEducations,
}) {
  const [school, setSchool] = useState(_school);
  const [major, setMajor] = useState(_major);
  const [position, setPosition] = useState(_position);
  const posName = ["재학중", "학사졸업", "석사졸업", "박사졸업"];

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
  };

  const handleMajorChange = (e) => {
    setMajor(e.target.value);
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Form.Group controlId="useEditSchool" className="mb-3">
          <Form.Control
            type="text"
            value={school}
            onChange={handleSchoolChange}
          />
        </Form.Group>

        <Form.Group controlId="userEditMajor" className="mb-3">
          <Form.Control
            type="text"
            value={major}
            onChange={handleMajorChange}
          />
        </Form.Group>

        <Form.Group controlId="userEditPosition" className="mb-3">
          {posName.map((pos) => (
            <Form.Check
              inline
              key={posName.indexOf(pos)}
              type="radio"
              label={pos}
              value={pos}
              checked={position === pos}
              onChange={handlePositionChange}
            />
          ))}
        </Form.Group>

        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button variant="primary" type="submit" className="me-3">
              확인
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}

export default EducationEditForm;