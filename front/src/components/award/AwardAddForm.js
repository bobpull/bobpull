import React, { useState, useContext } from "react";
import { AwardsContext } from "./Award";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm({ setIsAdding }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setAwards } = useContext(AwardsContext);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post("award/create", {
        title,
        description,
      });
      setAwards((current) => {
        const newAwards = [...current];
        newAwards.push(response.data);
        return newAwards;
      });
      setIsAdding(false);
    } catch (err) {
      alert('동일한 수상 이력을 중복으로 등록할 수 없습니다.');
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="useAddTitle" className="mb-3">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="userAddDescription" className="mb-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
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

export default AwardAddForm;
