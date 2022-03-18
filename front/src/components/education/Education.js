import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card } from "react-bootstrap";
import EducationCard from "./EducationCard";
import EducationAddButton from './EducationAddButton';
import EducationAddForm from './EducationAddForm';
import * as Api from "../../api";

function Education({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [educations, setEducations] = useState([]);

  return (
    <>
      <Row>
        <Col>
          <Card className="mb-2">
            <Card.Body>
              <Card.Title>학력</Card.Title>

              <EducationCard isEditable={isEditable} />

              {isEditable && <EducationAddButton setIsAdding={setIsAdding} />}

              {isAdding && (
                <EducationAddForm
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

export default Education;
