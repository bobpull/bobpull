import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Card } from "react-bootstrap";
import * as Api from "../../api";

function AwardCard({ isEditable, setIsEditing, setIsAdding }) {
  return (
    <Card.Text>
      <Row>
        <Col>
          <span>해커 대회 1등</span>
          <br />
          <span className="text-muted">서울시 해커대회에서 1등함</span>
        </Col>
        {isEditable && (
          <Col lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
