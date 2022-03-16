import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col } from "react-bootstrap";

function AwardAddButton({ setIsAdding }) {
  return (
    <>
      <Row className="mt-3 mb-3 text-center">
        <Col>
          <Button variant="primary" onClick={() => setIsAdding(true)}>
            +
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default AwardAddButton;
