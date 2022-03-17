import React, { useState, useEffect, createContext, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import AwardCard from "./AwardCard";
import AwardAddButton from "./AwardAddButton";
import * as Api from "../../api";

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

              {awards.map((award) => (
                <AwardCard
                  id={award._id}
                  key={award._id}
                  title={award.title}
                  description={award.description}
                  isEditable={isEditable}
                  awards={awards}
                  setAwards={setAwards}
                />
              ))}

              <AwardAddButton setIsAdding={setIsAdding} />

              {isAdding && (
                <AwardAddForm
                  setIsAdding={setIsAdding}
                  awards={awards}
                  setAwards={setAwards}
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
