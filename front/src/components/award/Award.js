import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card } from "react-bootstrap";
import AwardEditForm from "./AwardEditForm";
import AwardAddForm from "./AwardAddForm";
import AwardCard from "./AwardCard";
import AwardAddButton from "./AwardAddButton";
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
                  setIsAdding={setIsAdding}
                />
              )}

              <AwardAddButton setIsAdding={setIsAdding} />
              {isAdding && <AwardAddForm setIsAdding={setIsAdding} />}

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Award;
