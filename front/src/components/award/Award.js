import React, { useState, useEffect, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import AwardCard from "./AwardCard";
import * as Api from "../../api";

export const AwardsContext = createContext();

function Award({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      <Row>
        <Col>
          <Card className="mb-2">
            <Card.Body>
              <Card.Title>수상이력</Card.Title>
              <AwardsContext.Provider value={{ awards, setAwards }}>
                {awards.map((award) => (
                  <AwardCard
                    id={award.id}
                    key={award.id}
                    title={award.title}
                    description={award.description}
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

                {isAdding && <AwardAddForm setIsAdding={setIsAdding} />}
              </AwardsContext.Provider>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Award;
