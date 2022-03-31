import React, { useState, useContext } from "react";
import { EducationsContext } from "./Education";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ setIsAdding }) {
  const { setEducations } = useContext(EducationsContext);
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");
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
      const response = await Api.post("education/create", {
        school,
        major,
        degree,
      });
      setEducations((current) => {
        const newEducations = [...current];
        newEducations.push(response.data);
        return newEducations;
      });
      setIsAdding(false);
    } catch (err) {
      alert('동일한 학력을 중복으로 등록할 수 없습니다.');
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
          required
        />
      </Form.Group>

      <Form.Group controlId="userAddMajor" className="mb-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={handleMajorChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="userAddDegree">
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
      {degree === "" ? (
        <span style={{ color: "red", fontSize: "12px" }}>
          학위를 선택해주세요
        </span>
      ) : (
        ""
      )}

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
