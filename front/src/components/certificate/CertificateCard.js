import { Card, Row, Col, Button } from "react-bootstrap";

function CertificateCard({ certificate, isEditable }) {
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
        {isEditable && (
          <Col lg="1">
            <Button
              className="mr-3"
              variant="outline-info"
              size="sm"
              onClick={() => {}}
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
