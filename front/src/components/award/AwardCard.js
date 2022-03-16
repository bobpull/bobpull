import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Card } from "react-bootstrap";
import AwardEditForm from "./AwardEditForm";
import * as Api from "../../api";

function AwardCard({ isEditable, setIsAdding, title, body }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card.Text>
      <Row>
        {isEditing ? (
          <AwardEditForm isEditing={isEditing} setIsEditing={setIsEditing} _title={title} _body={body} />
        ) : (
          <>
            <Col>
              <span>{title}</span>
              <br />
              <span className="text-muted">{body}</span>
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

export default AwardCard;
