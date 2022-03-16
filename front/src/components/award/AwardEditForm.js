import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ setIsEditing }) {
  return (
    <Form className="mb-3">
      <Form.Group controlId="useEditTitle" className="mb-3">
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group controlId="userEditContent" className="mb-3">
        <Form.Control type="text" />
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
  );
}

export default AwardEditForm;
