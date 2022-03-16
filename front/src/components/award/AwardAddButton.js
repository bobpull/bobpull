import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Card } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddButton({ isEditable, setIsAdding }) {
  return (
    <>
      {isEditable && (
        <Row className="mt-3 mb-3 text-center">
          <Col>
            <Button variant="primary" onClick={() => setIsAdding(true)}>
              +
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default AwardAddButton;
