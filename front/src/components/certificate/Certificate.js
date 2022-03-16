import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import CertificateEditForm from "./CertificateEditForm";

function Certificate() {
  const [addCertificate, setAddCertificate] = useState(false);
  return (
    <Card className="ml-2">
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        <Button
          onClick={() => {
            setAddCertificate(true);
          }}
        >
          +
        </Button>

        {addCertificate && <CertificateEditForm />}
      </Card.Body>
    </Card>
  );
}

export default Certificate;
