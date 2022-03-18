import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Card } from "react-bootstrap";
import EducationEditForm from "./EducationEditForm";
import EducationDeleteModal from "./EducationDeleteModal";

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
  const [show, setShow] = useState(false);

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
              <span>{school}</span>
              <br />
              <span className="text-muted">
                {major} ({position})
              </span>
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

            {isEditable && (
              <Col lg="1">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => setShow(true)}
                >
                  삭제
                </Button>
                <EducationDeleteModal
                  show={show}
                  onHide={() => setShow(false)}
                  id={id}
                  educations={educations}
                  setEducations={setEducations}
                />
              </Col>
            )}
          </>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;