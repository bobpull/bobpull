import { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import CertificateEditForm from "./CertificateEditForm";

function CertificateCard({ certificate, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return !isEditing ? (
    <Card.Text>
      <Row className="align-itmes-center">
        <Col>
          {certificate.title}
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">{certificate.when_date}</span>
        </Col>
        {isEditable && (
          <Col lg="1">
            <Button
              className="mr-3"
              variant="outline-info"
              size="sm"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  ) : (
    <CertificateEditForm
      certificate={certificate}
      setIsEditing={setIsEditing}
    />
  );
}

export default CertificateCard;
