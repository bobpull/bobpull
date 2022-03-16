import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card } from "react-bootstrap";
import AwardEditForm from "./AwardEditForm";
import AwardAddForm from "./AwardAddForm";
import AwardCard from "./AwardCard";
import AwardAddButton from "./AwardAddButton";
import * as Api from "../../api";
import axios from "axios";

function Award({ isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    const fetchFunc = async () => {
      const response = await axios.get("http://localhost:3000/post.json");
      console.log(response.data);
      setAwards(response.data);
    };
    fetchFunc();
  }, []);

  return (
    <>
      <Row>
        <Col>
          <Card className="mb-2">
            <Card.Body>
              <Card.Title>수상이력</Card.Title>

              {awards.map((award) => (
                <AwardCard
                  key={award.id}
                  title={award.title}
                  body={award.body}
                  isEditable={isEditable}
                  setIsAdding={setIsAdding}
                />
              ))}

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
