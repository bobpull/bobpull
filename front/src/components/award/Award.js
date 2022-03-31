import React, { useState, useEffect, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import AwardCard from "./AwardCard";
import * as Api from "../../api";
import { AiFillQuestionCircle } from "react-icons/ai";

export const AwardsContext = createContext();

function Award({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    Api.get("awardlist", portfolioOwnerId)
      .then((res) => setAwards(res.data))
      .catch((err) => setAwards([]));
  }, [portfolioOwnerId]);

  return (
    <>
      <Row>
        <Col>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>수상이력</span>
                  {isEditable && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="award-tooltip">
                          희망 직무와 관련된 수상이력을 작성해주세요.
                        </Tooltip>
                      }
                    >
                      <span style={{ color: "#bfbfbf", marginLeft: 8 }}>
                        <AiFillQuestionCircle size={22} />
                      </span>
                    </OverlayTrigger>
                  )}
                </div>
              </Card.Title>
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
