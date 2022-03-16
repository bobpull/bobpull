import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm({ setIsAdding }) {
  return (
    <Form>
      <Form.Group controlId="useAddTitle" className="mb-3">
        <Form.Control type="text" placeholder="수상내역" />
      </Form.Group>

      <Form.Group controlId="userAddContent" className="mb-3">
        <Form.Control type="text" placeholder="상세내역" />
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
