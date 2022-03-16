import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";
import axios from 'axios';

function AwardEditForm({ isEditing, setIsEditing, _title, _body }) {
  const [title, setTitle] = useState(_title);
  const [body, setBody] = useState(_body);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
      title,
      body
    });
    console.log(response.data);
  }

  return (
    <>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Form.Group controlId="useEditTitle" className="mb-3">
          <Form.Control type="text" value={title} onChange={handleTitleChange} />
        </Form.Group>

        <Form.Group controlId="userEditContent" className="mb-3">
          <Form.Control type="text" value={body} onChange={handleBodyChange} />
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

export default AwardEditForm;
