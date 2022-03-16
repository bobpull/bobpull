import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card } from "react-bootstrap";
import AwardEditForm from "./AwardEditForm";
import AwardAddForm from "./AwardAddForm";
import AwardAddButton from "./AwardAddButton";
import AwardCard from "./AwardCard";
import * as Api from "../../api";

function Award({ isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <Row>
        <Col>
          <Card className="mb-2">
            <Card.Body>
              <Card.Title>수상이력</Card.Title>

              {isEditing ? (
                <AwardEditForm setIsEditing={setIsEditing} />
              ) : (
                <AwardCard
                  isEditable={isEditable}
                  setIsEditing={setIsEditing}
                />
              )}

              {isAdding ? (
                <AwardAddForm setIsAdding={setIsAdding} />
              ) : (
                <AwardAddButton
                  isEditable={isEditable}
                  setIsAdding={setIsAdding}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Award;
