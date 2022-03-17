import { useState, useEffect } from "react";
import { Card, Row, Button } from "react-bootstrap";
import CertificateEditForm from "./CertificateEditForm";
import CertificateAddForm from "./CertificateAddForm";
import CertificateCard from "./CertificateCard";
import * as Api from "../../api";

function Certificate({ portfolioOwnerId, isEditable }) {
  const [addCertificate, setAddCertificate] = useState(false);
  const [certificates, setCertificates] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
    Api.get("certificatelist", portfolioOwnerId).then((res) =>
      setCertificates(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card className="ml-2">
      <Card.Body>
        <Card.Title>자격증</Card.Title>

        {certificates.map((v) => (
          <CertificateCard certificate={v} isEditable={isEditable} />
        ))}

        {isEditable && (
          <Row className="mt-3 mb-4 text-center">
            <Button
              className="btn-primary"
              size="sm"
              onClick={() => {
                setAddCertificate(true);
              }}
            >
              +
            </Button>
          </Row>
        )}

        {addCertificate && (
          <CertificateAddForm
            user={user}
            certificates={certificates}
            setCertificates={setCertificates}
            setAddCertificate={setAddCertificate}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificate;
