import { Card, Row, Col, Button } from "react-bootstrap";

function CertificateCard({ certificate, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-itmes-center">
        <Col>
          {certificate.title}
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">{certificate.when_date}</span>
        </Col>
        <Col lg="1">
          <Button
            className="mr-3"
            variant="outline-info"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            편집
          </Button>
        </Col>
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
