import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Card } from "react-bootstrap";
import EducationEditForm from "./EducationEditForm";

function EducationCard({
  id,
  isEditable,
  school,
  major,
  position,
  educations,
  setEducations,
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card.Text>
      <Row>
        {isEditing ? (
          <EducationEditForm
            id={id}
            setIsEditing={setIsEditing}
            _school={school}
            _major={major}
            _position={position}
            educations={educations}
            setEducations={setEducations}
          />
        ) : (
          <>
            <Col>
              <span>서울대</span>
              <br />
              <span className="text-muted">기계공학과 (학사졸업)</span>
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
          </>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;
