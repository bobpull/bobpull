import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ setIsAdding, educations, setEducations }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");
  const posName = ["재학중", "학사졸업", "석사졸업", "박사졸업"];

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
  };

  const handleMajorChange = (e) => {
    setMajor(e.target.value);
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post("education/create", {
        school,
        major,
        position,
      });
      setEducations([...educations, response.data]);
      setIsAdding(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="useAddSchool" className="mb-3">
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={school}
          onChange={handleSchoolChange}
        />
      </Form.Group>

      <Form.Group controlId="userAddMajor" className="mb-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={handleMajorChange}
        />
      </Form.Group>

      <Form.Group controlId="userAddPosition" className="mb-3">
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
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;
