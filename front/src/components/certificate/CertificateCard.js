import { Card, Button } from "react-bootstrap";

function CertificateCard({ certificate, setIsEditing }) {
  return (
    <Card.Text>
      {certificate.title}
      <br />
      {certificate.description}
      <br />
      {certificate.when_date}
      <Button
        className="mr-3"
        variant="outline-info"
        size="sm"
        onClick={() => setIsEditing(true)}
      >
        편집
      </Button>
    </Card.Text>
  );
}

export default CertificateCard;
