import React, { useState, useEffect, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button } from "react-bootstrap";
import EducationCard from "./EducationCard";
import EducationAddForm from "./EducationAddForm";
import * as Api from "../../api";

export const EducationsContext = createContext();

function Education({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    Api.get("educationlist", portfolioOwnerId)
      .then((res) => setEducations(res.data))
      .catch((err) => {
        setEducations([]);
      });
  }, [portfolioOwnerId]);

  return (
    <>
      <Row>
        <Col>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>학력</Card.Title>
              <EducationsContext.Provider value={{ educations, setEducations }}>
                {educations.map((education) => (
                  <EducationCard
                    id={education.id}
                    key={education.id}
                    school={education.school}
                    major={education.major}
                    degree={education.degree}
                    isEditable={isEditable}
                  />
                ))}

                {isEditable && (
                  <Row className="mt-3 mb-3 text-center">
                    <Col>
                      <Button
                        variant="primary"
                        onClick={() => setIsAdding(true)}
                      >
                        +
                      </Button>
                    </Col>
                  </Row>
                )}

                {isAdding && <EducationAddForm setIsAdding={setIsAdding} />}
              </EducationsContext.Provider>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Education;
