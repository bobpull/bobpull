import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import axios from 'axios';

function AwardAddForm({ setIsAdding }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title,
      body
    });
    console.log(response.data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="useAddTitle" className="mb-3">
        <Form.Control type="text" placeholder="수상내역" value={title} onChange={handleTitleChange} />
      </Form.Group>

      <Form.Group controlId="userAddContent" className="mb-3">
        <Form.Control type="text" placeholder="상세내역" value={body} onChange={handleBodyChange} />
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
