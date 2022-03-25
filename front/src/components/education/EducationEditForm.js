import React, { useState, useContext } from "react";
import { EducationsContext } from "./Education";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({ id, setIsEditing, _school, _major, _degree }) {
  const { setEducations } = useContext(EducationsContext);
  const [school, setSchool] = useState(_school);
  const [major, setMajor] = useState(_major);
  const [degree, setDegree] = useState(_degree);
  const posName = ["재학중", "학사졸업", "석사졸업", "박사졸업"];

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
  };

  const handleMajorChange = (e) => {
    setMajor(e.target.value);
  };

  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.put(`educations/${id}`, {
        id,
        school,
        major,
        degree,
      });
      setEducations((cur) =>
        cur.map((education) => education.id === id ? { ...education, school, major, degree } : education)
      );
      setIsEditing(false);
    } catch (err) {
      alert('동일한 학력을 중복으로 등록할 수 없습니다.');
      console.error(err);
    }
  };

  return (
    <>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Form.Group controlId="useEditSchool" className="mb-3">
          <Form.Control
            type="text"
            value={school}
            onChange={handleSchoolChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="userEditMajor" className="mb-3">
          <Form.Control
            type="text"
            value={major}
            onChange={handleMajorChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="userEditPosition" className="mb-3">
          {posName.map((pos) => (
            <Form.Check
              inline
              key={posName.indexOf(pos)}
              id={"degree" + posName.indexOf(pos)}
              type="radio"
              label={pos}
              value={pos}
              checked={degree === pos}
              onChange={handleDegreeChange}
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
